from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from app.core.database import SessionLocal

from app.models.employee import Employee

from app.schemas.employee import (
    EmployeeCreate,
    EmployeeResponse
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

    db: Session = Depends(get_db)

):

    new_employee = Employee(**employee.dict())

    db.add(new_employee)

    db.commit()

    db.refresh(new_employee)

    return new_employee


# GET ALL EMPLOYEES

@router.get("/", response_model=list[EmployeeResponse])

def get_employees(

    db: Session = Depends(get_db)

):

    return db.query(Employee).all()


# UPDATE EMPLOYEE

@router.put("/{employee_id}")

def update_employee(

    employee_id: int,

    employee: EmployeeCreate,

    db: Session = Depends(get_db)

):

    existing_employee = db.query(Employee).filter(
        Employee.id == employee_id
    ).first()

    if not existing_employee:

        return {
            "message": "Employee not found"
        }

    existing_employee.employee_id = employee.employee_id

    existing_employee.firstname = employee.firstname

    existing_employee.middlename = employee.middlename

    existing_employee.lastname = employee.lastname

    existing_employee.department = employee.department

    existing_employee.position = employee.position

    existing_employee.employment_status = employee.employment_status

    existing_employee.email = employee.email

    existing_employee.mobile = employee.mobile

    existing_employee.role = employee.role

    existing_employee.salary = employee.salary

    existing_employee.branch_id = employee.branch_id

    db.commit()

    db.refresh(existing_employee)

    return existing_employee


# DELETE EMPLOYEE

@router.delete("/{employee_id}")

def delete_employee(

    employee_id: int,

    db: Session = Depends(get_db)

):

    employee = db.query(Employee).filter(
        Employee.id == employee_id
    ).first()

    if not employee:

        return {
            "message": "Employee not found"
        }

    db.delete(employee)

    db.commit()

    return {
        "message": "Employee deleted successfully"
    }