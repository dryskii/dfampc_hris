from fastapi import (
    APIRouter,
    UploadFile,
    File,
    Query
)

import os
import shutil

from app.services.face_service import verify_faces

router = APIRouter()

UPLOAD_DIR = "uploads/registered_faces"

# REGISTER FACE

@router.post("/register")
async def register_face(

    employee_id: str = Query(...),

    file: UploadFile = File(...)
):

    filename = f"{employee_id}.jpg"

    file_path = os.path.join(
        UPLOAD_DIR,
        filename
    )

    with open(file_path, "wb") as buffer:

        shutil.copyfileobj(
            file.file,
            buffer
        )

    return {

        "message": "Face registered successfully",
        "employee_id": employee_id
    }


# VERIFY FACE

@router.post("/verify")
async def verify_face(

    employee_id: str = Query(...),

    file: UploadFile = File(...)
):

    registered_face_path = os.path.join(

        UPLOAD_DIR,

        f"{employee_id}.jpg"
    )

    # CHECK REGISTERED FACE

    if not os.path.exists(

        registered_face_path
    ):

        return {

            "verified": False,

            "message": "No registered face found"
        }

    # SAVE TEMP IMAGE

    temp_uploaded_path = os.path.join(

        UPLOAD_DIR,

        f"temp_{employee_id}.jpg"
    )

    with open(

        temp_uploaded_path,

        "wb"
    ) as buffer:

        shutil.copyfileobj(

            file.file,

            buffer
        )

    # VERIFY

    verified = verify_faces(

        registered_face_path,

        temp_uploaded_path
    )

    # DELETE TEMP FILE

    os.remove(temp_uploaded_path)

    return {

        "verified": verified
    }
async def verify_face(

    employee_id: str = Query(...),

    file: UploadFile = File(...)
):

    return {

        "verified": True,
        "employee_id": employee_id
    }