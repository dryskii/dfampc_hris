from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import SessionLocal

from app.models.employee import Employee

from app.schemas.employee import (
    EmployeeCreate,
    EmployeeResponse
)

from app.core.dependencies import (
    require_hr,
    require_branch_staff,
    require_employee
)

router = APIRouter(
    prefix="/api/employees",
    tags=["Employees"]
)


def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


# CREATE EMPLOYEE

@router.post("/", response_model=EmployeeResponse)

def create_employee(

    employee: EmployeeCreate,

    db: Session = Depends(get_db),

    user=Depends(require_hr)

):

    new_employee = Employee(**employee.dict())

    db.add(new_employee)

    db.commit()

    db.refresh(new_employee)

    return new_employee


# VIEW EMPLOYEES

@router.get("/", response_model=list[EmployeeResponse])

def get_employees(

    db: Session = Depends(get_db),

    user=Depends(require_branch_staff)

):

    if user["role"] in [

        "Super Admin",
        "HR Admin"

    ]:

        return db.query(Employee).all()

    return db.query(Employee).filter(
        Employee.branch_id == user["branch_id"]
    ).all()


# VIEW OWN PROFILE

@router.get("/me")

def my_profile(

    user=Depends(require_employee)

):

    return {

        "username": user.get("sub"),
        "role": user.get("role"),
        "branch_id": user.get("branch_id")

    }