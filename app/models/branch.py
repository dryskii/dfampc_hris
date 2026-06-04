from sqlalchemy import Column, Integer, String, Float
from app.core.database import Base


class Branch(Base):

    __tablename__ = "branches"

    id = Column(Integer, primary_key=True, index=True)

    branch_name = Column(String, nullable=False)

    address = Column(String, nullable=False)

    region = Column(String, nullable=True)

    province = Column(String, nullable=True)

    city = Column(String, nullable=True)

    exact_address = Column(String, nullable=True)

    latitude = Column(Float, nullable=False)

    longitude = Column(Float, nullable=False)

    allowed_radius = Column(Float, default=100)