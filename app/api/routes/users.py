from fastapi import APIRouter, Depends
from app.api.deps import get_current_user, require_role

router = APIRouter()

@router.get("/me")
def get_me(user=Depends(get_current_user)):
    return {"user": user}

@router.get("/admin-only")
def admin_only(user=Depends(require_role("admin"))):
    return {"message": "Welcome Admin"}