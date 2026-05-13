from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.database import Base, engine
from app.models.attendance import Attendance
from app.api.routes import attendance
from app.api.routes import attendance_logs

Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ATTENDANCE ROUTE
app.include_router(
    attendance.router,
    prefix="/api/attendance",
    tags=["Attendance"]
)

# ATTENDANCE LOGS ROUTE
app.include_router(
    attendance_logs.router,
    prefix="/api/attendance-logs",
    tags=["Attendance Logs"]
)

# ROOT API
@app.get("/")
def root():

    return {
        "message": "DFAMPC HRIS API is running"
    }