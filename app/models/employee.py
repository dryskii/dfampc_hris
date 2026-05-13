from sqlalchemy import (
    Column,
    String,
    Float,
    Date,
    DateTime
)

from app.core.database import Base

from datetime import datetime
import uuid


class Employee(Base):

    __tablename__ = "employees"

    id = Column(
        String,
        primary_key=True,
        default=lambda: str(uuid.uuid4())
    )

    employee_id = Column(
        String,
        unique=True,
        nullable=False
    )

    first_name = Column(String)

    middle_name = Column(String)

    last_name = Column(String)

    department = Column(String)

    position = Column(String)

    employment_status = Column(String)

    contact_number = Column(String)

    email = Column(String)

    address = Column(String)

    date_hired = Column(Date)

    basic_salary = Column(Float)

    status = Column(String, default="ACTIVE")

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )