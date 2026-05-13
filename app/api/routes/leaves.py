from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from datetime import timedelta

from app.core.database import get_db

from app.models.leave import Leave

from app.schemas.leave import (
    LeaveCreate,
    LeaveApproval
)

router = APIRouter()


#
# FILE LEAVE
#

@router.post("/")
def file_leave(
    request: LeaveCreate,
    db: Session = Depends(get_db)
):

    total_days = (
        request.end_date -
        request.start_date
    ).days + 1

    leave = Leave(

        employee_id=request.employee_id,

        leave_type=request.leave_type,

        start_date=request.start_date,

        end_date=request.end_date,

        total_days=total_days,

        reason=request.reason
    )

    db.add(leave)

    db.commit()

    db.refresh(leave)

    return {
        "message": "Leave filed successfully"
    }


#
# GET LEAVES
#

@router.get("/")
def get_leaves(
    db: Session = Depends(get_db)
):

    leaves = db.query(Leave).all()

    return leaves


#
# APPROVE / REJECT
#

@router.put("/{leave_id}")
def approve_leave(
    leave_id: str,
    request: LeaveApproval,
    db: Session = Depends(get_db)
):

    leave = db.query(Leave).filter(
        Leave.id == leave_id
    ).first()

    if not leave:
        return {
            "message": "Leave not found"
        }

    leave.status = request.status

    leave.approved_by = request.approved_by

    db.commit()

    return {
        "message": f"Leave {request.status}"
    }