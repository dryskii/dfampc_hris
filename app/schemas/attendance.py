from pydantic import BaseModel

class AttendanceRequest(BaseModel):

    employee_id: str
    latitude: float
    longitude: float


class AttendanceResponse(BaseModel):

    message: str