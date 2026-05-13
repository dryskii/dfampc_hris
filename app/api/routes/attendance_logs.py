from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.attendance import Attendance

router = APIRouter()


@router.get("/")
def get_attendance_logs(db: Session = Depends(get_db)):

    logs = db.query(Attendance).all()

    results = []

    for log in logs:

        results.append({

            "id": log.id,
            "employee_id": log.employee_id,
            "status": log.status,
            "attendance_type": log.attendance_type,
            "time_in": log.time_in,
            "time_out": log.time_out,
            "latitude": log.latitude,
            "longitude": log.longitude,
            "created_at": log.created_at

        })

    return results