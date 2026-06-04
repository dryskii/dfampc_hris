import sqlite3

conn = sqlite3.connect("test.db")
cursor = conn.cursor()

try:
    cursor.execute(
        "ALTER TABLE users ADD COLUMN branch_id VARCHAR"
    )
    conn.commit()
    print("SUCCESS: branch_id added")
except Exception as e:
    print("ERROR:", e)

conn.close()