from app.core.database import SessionLocal
from app.models.user import User

db = SessionLocal()

users = db.query(User).all()

print("\n=== USERS TABLE ===\n")

for u in users:
    print(
        f"Username: {u.username} | "
        f"Role: {u.role_id} | "
        f"Branch: {u.branch_id}"
    )

db.close()