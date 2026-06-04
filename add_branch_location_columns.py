import sqlite3

conn = sqlite3.connect("test.db")

cursor = conn.cursor()

columns = [

    "region",
    "province",
    "city",
    "exact_address"

]

for column in columns:

    try:

        cursor.execute(
            f"ALTER TABLE branches ADD COLUMN {column} VARCHAR"
        )

        print(f"Added: {column}")

    except Exception as e:

        print(f"Skipped: {column}")

conn.commit()

conn.close()

print("\nBranch table updated successfully.")