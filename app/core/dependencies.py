from fastapi import Depends
from fastapi import HTTPException

from fastapi.security import (
    HTTPBearer,
    HTTPAuthorizationCredentials
)

from app.core.security import decode_token

security = HTTPBearer(auto_error=True)


def get_current_user(

    credentials: HTTPAuthorizationCredentials = Depends(security)

):

    token = credentials.credentials

    payload = decode_token(token)

    if not payload:

        raise HTTPException(

            status_code=401,
            detail="Invalid or expired token"

        )

    return payload


# SUPER ADMIN ONLY

def require_super_admin(

    user=Depends(get_current_user)

):

    if user.get("role") != "Super Admin":

        raise HTTPException(

            status_code=403,
            detail="Super Admin access required"

        )

    return user


# HR ADMIN / SUPER ADMIN

def require_hr(

    user=Depends(get_current_user)

):

    allowed_roles = [

        "Super Admin",
        "HR Admin"

    ]

    if user.get("role") not in allowed_roles:

        raise HTTPException(

            status_code=403,
            detail="HR Admin access required"

        )

    return user


# BRANCH STAFF

def require_branch_staff(

    user=Depends(get_current_user)

):

    allowed_roles = [

        "Super Admin",
        "HR Admin",
        "Branch Manager",
        "Encoder"

    ]

    if user.get("role") not in allowed_roles:

        raise HTTPException(

            status_code=403,
            detail="Branch access required"

        )

    return user


# ANY LOGGED-IN USER

def require_employee(

    user=Depends(get_current_user)

):

    return user


# ADMIN OR HIGHER

def require_admin(

    user=Depends(get_current_user)

):

    allowed_roles = [

        "Super Admin",
        "HR Admin"

    ]

    if user.get("role") not in allowed_roles:

        raise HTTPException(

            status_code=403,
            detail="Admin access required"

        )

    return user

# BRANCH MANAGER ONLY

def require_branch_manager(

    user=Depends(get_current_user)

):

    allowed_roles = [

        "Super Admin",
        "HR Admin",
        "Branch Manager"

    ]

    if user.get("role") not in allowed_roles:

        raise HTTPException(

            status_code=403,
            detail="Branch Manager access required"

        )

    return user