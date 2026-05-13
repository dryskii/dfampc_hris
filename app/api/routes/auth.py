from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.user import User
from app.schemas.auth_schema import LoginRequest, TokenResponse
from app.core.security import verify_password, create_access_token, create_refresh_token

router = APIRouter()

@router.post("/login")
def login(data: LoginRequest):
    # TEMP LOGIN (no DB)
    if data.username == "admin" and data.password == "1234":
        payload = {
            "sub": "1",
            "role": "admin"
        }

        return {
            "access_token": create_access_token(payload),
            "refresh_token": create_refresh_token(payload),
            "token_type": "bearer"
        }

    raise HTTPException(status_code=401, detail="Invalid credentials")