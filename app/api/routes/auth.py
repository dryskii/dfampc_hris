from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.models.user import User

from app.schemas.auth_schema import (
    LoginRequest,
    TokenResponse
)

from app.core.security import (
    verify_password,
    create_access_token,
    create_refresh_token
)

router = APIRouter()

def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()

@router.post(
    "/login",
    response_model=TokenResponse
)

def login(
    request: LoginRequest,
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.username == request.username
    ).first()

    if not user:

        raise HTTPException(
            status_code=401,
            detail="Invalid username"
        )

    if not verify_password(
        request.password,
        user.password_hash
    ):

        raise HTTPException(
            status_code=401,
            detail="Invalid password"
        )

    access_token = create_access_token({

    "sub": user.username,
    "role": user.role_id,
    "branch_id": user.branch_id

})

    

    refresh_token = create_refresh_token({

        "sub": user.username

    })

    return {

        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer"

    }