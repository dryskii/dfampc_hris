from pydantic import BaseModel

class EmployeeCreate(BaseModel):

    employee_id: str
    firstname: str
    lastname: str
    middlename: str | None = None
    department: str
    position: str
    employment_status: str
    email: str
    mobile: str
    role: str
    salary: float
    branch_id: int | None = None


class EmployeeResponse(EmployeeCreate):

    id: int

    class Config:
        from_attributes = True