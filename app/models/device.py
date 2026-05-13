from sqlalchemy import Column, String, DateTime
from datetime import datetime
import uuid

from app.core.database import Base


class Device(Base):

    __tablename__ = "devices"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))

    employee_id = Column(String, nullable=False)

    device_id = Column(String, nullable=False, unique=True)

    device_name = Column(String, nullable=True)

    registered_at = Column(DateTime, default=datetime.utcnow)