```python
from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from datetime import datetime, date

from geopy.distance import geodesic

from app.core.database import SessionLocal

from app.models.attendance import Attendance

from app.models.employee import Employee

from app.models.branch import Branch

from app.schemas.attendance import AttendanceCreate


router = APIRouter(
    prefix="/api/attendance",
    tags=["Attendance"]
)


#
# DATABASE CONNECTION
#

def get_db():

    db = SessionLocal()

    try:

        yield db

    finally:

        db.close()


#
# GEO-FENCING VALIDATION
#

def validate_geofence(

    employee_lat,

    employee_long,

    branch_lat,

    branch_long,

    allowed_radius

):

    employee_coords = (
        employee_lat,
        employee_long
    )

    branch_coords = (
        branch_lat,
        branch_long
    )

    distance = geodesic(
        employee_coords,
        branch_coords
    ).meters

    return {

        "allowed": distance <= allowed_radius,

        "distance": round(distance, 2)

    }


#
# ATTENDANCE ROUTE
#

@router.post("/")

def create_attendance(

    request: AttendanceCreate,

    db: Session = Depends(get_db)

):

    #
    # FIND EMPLOYEE
    #

    employee = db.query(Employee).filter(

        Employee.employee_id == request.employee_id

    ).first()

    if not employee:

        return {
            "message": "Employee not found"
        }

    #
    # FIND EMPLOYEE BRANCH
    #

    branch = db.query(Branch).filter(

        Branch.id == employee.branch_id

    ).first()

    if not branch:

        return {
            "message": "Employee branch not found"
        }

    #
    # VALIDATE GPS LOCATION
    #

    geo_validation = validate_geofence(

        request.latitude,

        request.longitude,

        branch.latitude,

        branch.longitude,

        branch.allowed_radius

    )

    #
    # REJECT IF OUTSIDE ALLOWED RADIUS
    #

    if not geo_validation["allowed"]:

        return {

            "message": "Outside allowed branch radius",

            "distance_in_meters":
                geo_validation["distance"]

        }

    #
    # CHECK TODAY'S ATTENDANCE
    #

    today = date.today()

    existing_attendance = db.query(Attendance).filter(

        Attendance.employee_id == employee.employee_id,

        Attendance.date == today

    ).first()

    #
    # TIME IN
    #

    if not existing_attendance:

        attendance = Attendance(

            employee_id=employee.employee_id,

            date=today,

            time_in=datetime.now(),

            latitude=request.latitude,

            longitude=request.longitude,

            branch_id=branch.id

        )

        db.add(attendance)

        db.commit()

        db.refresh(attendance)

        return {

            "message": "Time In successful",

            "employee":
                f"{employee.firstname} {employee.lastname}",

            "branch":
                branch.name,

            "distance_in_meters":
                geo_validation["distance"]

        }

    #
    # TIME OUT
    #

    if existing_attendance.time_out is None:

        existing_attendance.time_out = datetime.now()

        db.commit()

        db.refresh(existing_attendance)

        return {

            "message": "Time Out successful",

            "employee":
                f"{employee.firstname} {employee.lastname}",

            "branch":
                branch.name,

            "distance_in_meters":
                geo_validation["distance"]

        }

    #
    # ALREADY COMPLETED
    #

    return {

        "message":
            "Attendance already completed today"

    }


#
# GET ATTENDANCE LOGS
#

@router.get("/")

def get_attendance(

    db: Session = Depends(get_db)

):

    attendance_logs = db.query(Attendance).all()

    return attendance_logs