from app.core.database import SessionLocal
from app.models.branch import Branch

db = SessionLocal()

branches = db.query(Branch).all()

print("\n=== DFAMPC BRANCHES ===\n")

for branch in branches:

    print(
        branch.id,
        branch.branch_name,
        branch.address
    )

db.close()