import sqlite3

conn = sqlite3.connect("test.db")

cursor = conn.cursor()

columns_to_add = [

    "branch_id VARCHAR",

    "hours_worked FLOAT DEFAULT 0",

    "late_minutes FLOAT DEFAULT 0",

    "undertime_minutes FLOAT DEFAULT 0",

    "overtime_minutes FLOAT DEFAULT 0",

    "face_verified VARCHAR DEFAULT 'No'",

    "sync_status VARCHAR DEFAULT 'synced'"

]

for column in columns_to_add:

    try:

        cursor.execute(
            f"ALTER TABLE attendance ADD COLUMN {column}"
        )

        print(f"Added: {column}")

    except Exception as e:

        print(f"Skipped: {column} -> {e}")

conn.commit()

conn.close()

print("\nAttendance table updated successfully.")