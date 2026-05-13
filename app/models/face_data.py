from sqlalchemy import Column, String, LargeBinary, DateTime
from app.core.database import Base

import uuid
from datetime import datetime


class FaceData(Base):

    __tablename__ = "face_data"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))

    employee_id = Column(String, unique=True, nullable=False)

    encoding = Column(LargeBinary, nullable=False)

    created_at = Column(DateTime, default=datetime.utcnow)