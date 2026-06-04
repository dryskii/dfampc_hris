from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from fastapi import UploadFile
from fastapi import File

import os
import pandas as pd

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.models.branch import Branch

from app.schemas.branch import (
    BranchCreate,
    BranchResponse
)

router = APIRouter(
    prefix="/api/branches",
    tags=["Branches"]
)


# CREATE BRANCH

@router.post(
    "/",
    response_model=BranchResponse
)
def create_branch(

    branch: BranchCreate,

    db: Session = Depends(get_db)

):

    existing = db.query(Branch).filter(
        Branch.branch_name == branch.branch_name
    ).first()

    if existing:

        raise HTTPException(
            status_code=400,
            detail="Branch already exists"
        )

    new_branch = Branch(

        branch_name=branch.branch_name,

        address=branch.address,

        region=branch.region,

        province=branch.province,

        city=branch.city,

        exact_address=branch.exact_address,

        latitude=branch.latitude,

        longitude=branch.longitude,

        allowed_radius=branch.allowed_radius

    )

    db.add(new_branch)

    db.commit()

    db.refresh(new_branch)

    return new_branch


# GET ALL BRANCHES

@router.get(
    "/",
    response_model=list[BranchResponse]
)
def get_branches(

    db: Session = Depends(get_db)

):

    return db.query(Branch).all()


# BRANCH DROPDOWN

@router.get("/dropdown")
def branch_dropdown(

    db: Session = Depends(get_db)

):

    branches = db.query(Branch).all()

    return [

        {
            "id": branch.id,
            "name": branch.branch_name
        }

        for branch in branches

    ]


# IMPORT BRANCHES FROM EXCEL

@router.post("/import")
async def import_branches(

    file: UploadFile = File(...),

    db: Session = Depends(get_db)

):

    upload_folder = "uploads/branches"

    os.makedirs(
        upload_folder,
        exist_ok=True
    )

    file_path = os.path.join(
        upload_folder,
        file.filename
    )

    with open(
        file_path,
        "wb"
    ) as buffer:

        buffer.write(
            await file.read()
        )

    df = pd.read_excel(file_path)

    imported = 0
    skipped = 0

    for _, row in df.iterrows():

        record = str(
            row["DEPARTMENT OF FOREIGN AFFAIRS OFFICE OF CONSULAR AFFAIRS"]
        ).strip()

        if record == "nan":

            continue

        parts = record.split(",")

        branch_name = parts[0].strip()

        address = record

        existing = db.query(Branch).filter(
            Branch.branch_name == branch_name
        ).first()

        if existing:

            skipped += 1

            continue

        region = ""

        province = ""

        city = ""

        exact_address = address

        latitude = 0

        longitude = 0

        branch = Branch(

            branch_name=branch_name,

            address=address,

            region=region,

            province=province,

            city=city,

            exact_address=exact_address,

            latitude=latitude,

            longitude=longitude,

            allowed_radius=100

        )

        db.add(branch)

        imported += 1

    db.commit()

    return {

        "message": "Branch import completed",

        "imported": imported,

        "skipped": skipped

    }