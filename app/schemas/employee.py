from pydantic import BaseModel
from datetime import date


class EmployeeCreate(BaseModel):

    employee_id: str

    first_name: str

    middle_name: str | None = None

    last_name: str

    department: str

    position: str

    employment_status: str

    contact_number: str

    email: str

    address: str

    date_hired: date

    basic_salary: float


class EmployeeResponse(BaseModel):

    employee_id: str

    first_name: str

    last_name: str

    department: str

    position: str

    status: str