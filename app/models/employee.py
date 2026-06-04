from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    Numeric,
    TIMESTAMP,
    ForeignKey
)

from sqlalchemy.sql import func

from app.core.database import Base


class Employee(Base):

    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)

    employee_id = Column(String, unique=True)

    firstname = Column(String)

    lastname = Column(String)

    middlename = Column(String)

    department = Column(String)

    position = Column(String)

    employment_status = Column(String)

    email = Column(String)

    mobile = Column(String)

    role = Column(String)

    salary = Column(Numeric)

    leave_balance = Column(Integer, default=15)

    is_active = Column(Boolean, default=True)

    # CONNECT EMPLOYEE TO BRANCH
    branch_id = Column(Integer, ForeignKey("branches.id"))

    created_at = Column(
        TIMESTAMP,
        server_default=func.now()
    )