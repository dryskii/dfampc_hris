from pydantic import BaseModel
from datetime import datetime


class AttendanceCreate(BaseModel):

    employee_id: str

    latitude: float

    longitude: float

    device_id: str


class AttendanceResponse(BaseModel):

    id: int | None = None

    employee_id: str

    clock_in: datetime | None = None

    clock_out: datetime | None = None

    hours_worked: float | None = None

    late_minutes: int | None = None

    undertime_minutes: int | None = None

    overtime_minutes: int | None = None

    attendance_status: str | None = None

    message: str | None = None