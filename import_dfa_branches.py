from app.core.database import SessionLocal
from app.models.branch import Branch

db = SessionLocal()

branches = [

    {
        "branch_name": "DFA OCA CENTRAL",
        "address": "Robinsons Galleria, Quezon City"
    },

    {
        "branch_name": "DFA OCA NCR EAST",
        "address": "SM Megamall, Mandaluyong"
    },

    {
        "branch_name": "DFA OCA NORTH",
        "address": "Robinsons Novaliches, Quezon City"
    },

    {
        "branch_name": "DFA OCA SOUTH",
        "address": "Festival Mall, Alabang"
    },

    {
        "branch_name": "DFA OCA WEST",
        "address": "SM City Manila"
    }

]

for branch in branches:

    existing = db.query(Branch).filter(
        Branch.branch_name == branch["branch_name"]
    ).first()

    if not existing:

        db.add(

            Branch(
                branch_name=branch["branch_name"],
                address=branch["address"],
                latitude=0,
                longitude=0,
                allowed_radius=100
            )

        )

db.commit()

print("Branches imported successfully.")