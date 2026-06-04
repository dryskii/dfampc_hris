from sqlalchemy import Column, String, Boolean
from app.core.database import Base
import uuid


class User(Base):
    __tablename__ = "users"

    id = Column(
        String,
        primary_key=True,
        default=lambda: str(uuid.uuid4())
    )

    username = Column(
        String,
        unique=True,
        nullable=False
    )

    password_hash = Column(
        String,
        nullable=False
    )

    # Role name
    role_id = Column(
        String,
        nullable=False
    )

    # Branch assignment
    branch_id = Column(
    String,
    nullable=True
)

    is_active = Column(
        Boolean,
        default=True
    )