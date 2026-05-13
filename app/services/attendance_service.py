from datetime import datetime, date, time

from app.models.attendance import Attendance

from app.core.settings import (
    OFFICE_LATITUDE,
    OFFICE_LONGITUDE,
    ALLOWED_RADIUS_METERS
)

from app.utils.geofence import calculate_distance

from app.services.device_service import validate_device


OFFICE_TIME_IN = time(8, 0, 0)


def process_attendance(db, employee_id, latitude, longitude, device_id):

    today = date.today()

    #
    # ✅ GEO-FENCE VALIDATION
    #

    distance = calculate_distance(
        latitude,
        longitude,
        OFFICE_LATITUDE,
        OFFICE_LONGITUDE
    )

    if distance > ALLOWED_RADIUS_METERS:
        return {
            "message": "Outside allowed office radius",
            "type": "DENIED"
        }

    #
    # ✅ DEVICE VALIDATION
    #

    valid_device = validate_device(
        db,
        employee_id,
        device_id
    )

    if not valid_device:
        return {
            "message": "Unrecognized device",
            "type": "DENIED"
        }

    attendance = db.query(Attendance).filter(
        Attendance.employee_id == employee_id,
        Attendance.date == today
    ).first()

    now = datetime.now()

    #
    # ✅ TIME IN
    #
    if not attendance:

        status = "present"

        if now.time() > OFFICE_TIME_IN:
            status = "late"

        new_attendance = Attendance(
            employee_id=employee_id,
            date=today,
            time_in=now,
            status=status,
            latitude=latitude,
            longitude=longitude,
            device_id=device_id
        )

        db.add(new_attendance)
        db.commit()
        db.refresh(new_attendance)

        return {
            "message": "Time In recorded",
            "type": "TIME_IN"
        }

    #
    # ✅ TIME OUT
    #
    if attendance and not attendance.time_out:

        attendance.time_out = now

        db.commit()

        return {
            "message": "Time Out recorded",
            "type": "TIME_OUT"
        }

    #
    # ❌ DUPLICATE BLOCK
    #
    return {
        "message": "Attendance already completed today",
        "type": "DONE"
    }