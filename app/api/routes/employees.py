from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.models.employee import Employee

from app.schemas.employee import (
    EmployeeCreate
)

router = APIRouter()


#
# CREATE EMPLOYEE
#

@router.post("/")
def create_employee(
    request: EmployeeCreate,
    db: Session = Depends(get_db)
):

    employee = Employee(

        employee_id=request.employee_id,

        first_name=request.first_name,

        middle_name=request.middle_name,

        last_name=request.last_name,

        department=request.department,

        position=request.position,

        employment_status=request.employment_status,

        contact_number=request.contact_number,

        email=request.email,

        address=request.address,

        date_hired=request.date_hired,

        basic_salary=request.basic_salary
    )

    db.add(employee)

    db.commit()

    db.refresh(employee)

    return {
        "message": "Employee created successfully"
    }


#
# GET EMPLOYEES
#

@router.get("/")
def get_employees(
    db: Session = Depends(get_db)
):

    employees = db.query(Employee).all()

    return employees