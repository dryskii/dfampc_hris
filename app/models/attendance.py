from sqlalchemy import Column, String, Date, DateTime, Float
from app.core.database import Base
import uuid
from datetime import datetime

class Attendance(Base):
    __tablename__ = "attendance"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    employee_id = Column(String, nullable=False)
    date = Column(Date, nullable=False)

    time_in = Column(DateTime, nullable=True)
    time_out = Column(DateTime, nullable=True)

    status = Column(String, default="present")

    latitude = Column(Float)
    longitude = Column(Float)

    device_id = Column(String)

    created_at = Column(DateTime, default=datetime.utcnow)