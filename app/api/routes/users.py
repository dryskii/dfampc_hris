from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.core.database import SessionLocal

from app.models.user import User

from app.schemas.user_schema import (
    UserCreate,
    UserUpdate,
    UserResponse
)

from app.core.security import hash_password

from app.core.dependencies import (
    require_super_admin
)

router = APIRouter(
    prefix="/api/users",
    tags=["Users"]
)


def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


# CREATE USER

@router.post(
    "/",
    response_model=UserResponse
)
def create_user(

    user: UserCreate,

    db: Session = Depends(get_db),

    current_user=Depends(require_super_admin)

):

    existing_user = db.query(User).filter(
        User.username == user.username
    ).first()

    if existing_user:

        raise HTTPException(
            status_code=400,
            detail="Username already exists"
        )

    new_user = User(

        username=user.username,

        password_hash=hash_password(
            user.password
        ),

        role_id=user.role_id,

        branch_id=user.branch_id

    )

    db.add(new_user)

    db.commit()

    db.refresh(new_user)

    return new_user


# GET USERS

@router.get(
    "/",
    response_model=list[UserResponse]
)
def get_users(

    db: Session = Depends(get_db),

    current_user=Depends(require_super_admin)

):

    return db.query(User).all()


# UPDATE USER

@router.put("/{user_id}")
def update_user(

    user_id: str,

    payload: UserUpdate,

    db: Session = Depends(get_db),

    current_user=Depends(require_super_admin)

):

    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if not user:

        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    user.username = payload.username
    user.role_id = payload.role_id
    user.branch_id = payload.branch_id
    user.is_active = payload.is_active

    db.commit()

    return {
        "message": "User updated successfully"
    }


# DEACTIVATE USER

@router.delete("/{user_id}")
def deactivate_user(

    user_id: str,

    db: Session = Depends(get_db),

    current_user=Depends(require_super_admin)

):

    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if not user:

        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    user.is_active = False

    db.commit()

    return {
        "message": "User deactivated"
    }