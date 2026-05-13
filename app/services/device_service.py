from app.models.device import Device


def validate_device(db, employee_id, device_id):

    existing_device = db.query(Device).filter(
        Device.employee_id == employee_id
    ).first()

    #
    # ✅ FIRST DEVICE
    #
    if not existing_device:

        new_device = Device(
            employee_id=employee_id,
            device_id=device_id,
            device_name=device_id
        )

        db.add(new_device)
        db.commit()

        return True

    #
    # ✅ SAME DEVICE
    #
    if existing_device.device_id == device_id:
        return True

    #
    # ❌ DIFFERENT DEVICE
    #
    return False