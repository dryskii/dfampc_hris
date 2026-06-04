import sqlite3

conn = sqlite3.connect("test.db")

cursor = conn.cursor()

columns = [

    ("region", "VARCHAR"),
    ("province", "VARCHAR"),
    ("city", "VARCHAR"),
    ("exact_address", "VARCHAR")

]

for column_name, column_type in columns:

    try:

        cursor.execute(

            f"""
            ALTER TABLE branches
            ADD COLUMN {column_name} {column_type}
            """

        )

        print(f"Added: {column_name}")

    except Exception as e:

        print(f"Skipped: {column_name}")

conn.commit()

conn.close()

print(
    "\nBranch table updated successfully."
)