import sqlite3

conn = sqlite3.connect("test.db")

cursor = conn.cursor()

cursor.execute(
    "PRAGMA table_info(branches)"
)

print("\n=== BRANCHES TABLE COLUMNS ===\n")

for row in cursor.fetchall():
    print(row)

conn.close()