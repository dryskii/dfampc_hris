from sqlalchemy import (
    Column,
    String,
    Date,
    DateTime,
    Integer
)

from app.core.database import Base

from datetime import datetime
import uuid


class Leave(Base):

    __tablename__ = "leaves"

    id = Column(
        String,
        primary_key=True,
        default=lambda: str(uuid.uuid4())
    )

    employee_id = Column(
        String,
        nullable=False
    )

    leave_type = Column(String)

    start_date = Column(Date)

    end_date = Column(Date)

    total_days = Column(Integer)

    reason = Column(String)

    status = Column(
        String,
        default="PENDING"
    )

    approved_by = Column(String)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )