from fastapi import (
    APIRouter,
    UploadFile,
    File,
    Form
)

from datetime import datetime

router = APIRouter()

attendance_logs = {}


@router.post("/log")
async def log_attendance(

    file: UploadFile = File(...),

    employee_id: str = Form(...),

    latitude: float = Form(...),

    longitude: float = Form(...)

):

    current_time = datetime.now()

    today = current_time.date()

    key = f"{employee_id}_{today}"

    # AUTO TIME IN / TIME OUT

    if key not in attendance_logs:

        attendance_logs[key] = {

            "time_in": current_time,
            "time_out": None
        }

        return {

            "status": "success",

            "message":
                f"TIME IN recorded at "
                f"{current_time.strftime('%H:%M:%S')}",

            "employee_id": employee_id,

            "timestamp":
                current_time.strftime(
                    "%Y-%m-%d %H:%M:%S"
                ),

            "latitude": latitude,

            "longitude": longitude
        }

    else:

        if attendance_logs[key]["time_out"] is None:

            attendance_logs[key]["time_out"] = current_time

            return {

                "status": "success",

                "message":
                    f"TIME OUT recorded at "
                    f"{current_time.strftime('%H:%M:%S')}",

                "employee_id": employee_id,

                "timestamp":
                    current_time.strftime(
                        "%Y-%m-%d %H:%M:%S"
                    ),

                "latitude": latitude,

                "longitude": longitude
            }

        return {

            "status": "completed",

            "message":
                "Attendance already completed today",

            "employee_id": employee_id,

            "timestamp":
                current_time.strftime(
                    "%Y-%m-%d %H:%M:%S"
                ),

            "latitude": latitude,

            "longitude": longitude
        }