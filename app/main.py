from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.database import Base, engine

# IMPORT ROUTES
from app.api.routes import attendance
from app.api.routes import attendance_logs
from app.api.routes import employees
from app.api.routes import auth
from app.api.routes import branches
from app.api.routes import users
from app.api.routes import leaves
from app.api.routes import face

# IMPORT MODELS
from app.models.attendance import Attendance
from app.models.branch import Branch
from app.models.employee import Employee
from app.models.user import User

# CREATE TABLES
Base.metadata.create_all(bind=engine)

# FASTAPI APP
app = FastAPI(
    title="DFAMPC HRIS API",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://dfampc-hris-frontend.onrender.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# AUTH ROUTES
app.include_router(
    auth.router,
    prefix="/api/auth",
    tags=["Authentication"]
)

# EMPLOYEE ROUTES
app.include_router(
    employees.router
)

# ATTENDANCE ROUTES
app.include_router(
    attendance.router
)

# ATTENDANCE LOGS ROUTES
app.include_router(
    attendance_logs.router,
    prefix="/api/attendance-logs",
    tags=["Attendance Logs"]
)

# BRANCH ROUTES
app.include_router(
    branches.router
)

# USER ROUTES
app.include_router(
    users.router
)

# LEAVE ROUTES
app.include_router(
    leaves.router,
    prefix="/api/leaves",
    tags=["Leaves"]
)

# FACE RECOGNITION ROUTES
app.include_router(
    face.router,
    prefix="/api/face",
    tags=["Face Recognition"]
)

# ROOT ROUTE
@app.get("/")
def root():

    return {
        "message": "DFAMPC HRIS API is running"
    }