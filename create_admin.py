from app.core.database import SessionLocal
from app.models.user import User

from app.core.security import hash_password

db = SessionLocal()

admin = User(

    username="admin",

    password_hash=hash_password("admin123"),

    role_id="Super Admin"

)

db.add(admin)

db.commit()

print("Admin user created successfully")