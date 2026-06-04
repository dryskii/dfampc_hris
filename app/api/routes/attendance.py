from fastapi import (
    APIRouter,
    UploadFile,
    File,
    Form,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from datetime import datetime

from app.core.database import get_db

from app.models.employee import Employee
from app.models.branch import Branch
from app.models.attendance import Attendance

from app.utils.geofence import calculate_distance

router = APIRouter()


@router.post("/log")
async def log_attendance(

    file: UploadFile = File(...),

    employee_id: str = Form(...),

    latitude: float = Form(...),

    longitude: float = Form(...),

    db: Session = Depends(get_db)

):

    # FIND EMPLOYEE

    employee = db.query(Employee).filter(

        Employee.employee_id == employee_id

    ).first()

    if not employee:

        raise HTTPException(

            status_code=404,

            detail="Employee not found"

        )

    # FIND ASSIGNED BRANCH

    branch = db.query(Branch).filter(

        Branch.id == employee.branch_id

    ).first()

    if not branch:

        raise HTTPException(

            status_code=404,

            detail="Employee branch not assigned"

        )

    # CALCULATE DISTANCE

    distance = calculate_distance(

        latitude,
        longitude,

        branch.latitude,
        branch.longitude

    )

    # STRICT GEO-FENCE VALIDATION

    if distance > branch.allowed_radius:

        raise HTTPException(

            status_code=403,

            detail=(
                f"You are outside office radius "
                f"({round(distance, 2)} meters)"
            )

        )

    current_time = datetime.now()

    today = current_time.date()

    # DFAMPC STANDARD WORK SCHEDULE

    WORK_START_HOUR = 8

    WORK_END_HOUR = 17

    # CHECK EXISTING ATTENDANCE

    existing_attendance = db.query(Attendance).filter(

        Attendance.employee_id == employee_id,

        Attendance.date == today

    ).first()

    # TIME IN

    if not existing_attendance:

        # CALCULATE LATE MINUTES

        late_minutes = 0

        scheduled_start = current_time.replace(
            hour=WORK_START_HOUR,
            minute=0,
            second=0,
            microsecond=0
        )

        if current_time > scheduled_start:

            late_minutes = int(
                (
                    current_time -
                    scheduled_start
                ).total_seconds() / 60
            )

        attendance = Attendance(

            employee_id=employee_id,

            branch_id=str(branch.id),

            date=today,

            time_in=current_time,

            latitude=latitude,

            longitude=longitude,

            late_minutes=late_minutes,

            status="present"

        )

        db.add(attendance)

        db.commit()

        db.refresh(attendance)

        return {

            "status": "success",

            "message":
                f"TIME IN recorded at "
                f"{current_time.strftime('%H:%M:%S')}",

            "employee_id": employee_id,

            "employee_name":
                f"{employee.firstname} "
                f"{employee.lastname}",

            "branch": branch.branch_name,

            "distance":
                f"{round(distance, 2)} meters",

            "late_minutes": late_minutes,

            "timestamp":
                current_time.strftime(
                    "%Y-%m-%d %H:%M:%S"
                ),

            "latitude": latitude,

            "longitude": longitude
        }

    # TIME OUT

    if existing_attendance.time_out is None:

        existing_attendance.time_out = current_time

        # CALCULATE HOURS WORKED

        hours_worked = (

            current_time -

            existing_attendance.time_in

        ).total_seconds() / 3600

        existing_attendance.hours_worked = round(
            hours_worked,
            2
        )

        # UNDERTIME

        if hours_worked < 8:

            existing_attendance.undertime_minutes = int(
                (8 - hours_worked) * 60
            )

        # OVERTIME

        if hours_worked > 8:

            existing_attendance.overtime_minutes = int(
                (hours_worked - 8) * 60
            )

        db.commit()

        return {

            "status": "success",

            "message":
                f"TIME OUT recorded at "
                f"{current_time.strftime('%H:%M:%S')}",

            "employee_id": employee_id,

            "employee_name":
                f"{employee.firstname} "
                f"{employee.lastname}",

            "branch": branch.branch_name,

            "distance":
                f"{round(distance, 2)} meters",

            "hours_worked":
                existing_attendance.hours_worked,

            "undertime_minutes":
                existing_attendance.undertime_minutes,

            "overtime_minutes":
                existing_attendance.overtime_minutes,

            "timestamp":
                current_time.strftime(
                    "%Y-%m-%d %H:%M:%S"
                ),

            "latitude": latitude,

            "longitude": longitude
        }

    # ALREADY COMPLETED

    return {

        "status": "completed",

        "message":
            "Attendance already completed today",

        "employee_id": employee_id,

        "employee_name":
            f"{employee.firstname} "
            f"{employee.lastname}",

        "branch": branch.branch_name,

        "distance":
            f"{round(distance, 2)} meters",

        "timestamp":
            current_time.strftime(
                "%Y-%m-%d %H:%M:%S"
            ),

        "latitude": latitude,

        "longitude": longitude
    }