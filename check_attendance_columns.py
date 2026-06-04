import sqlite3

conn = sqlite3.connect("test.db")

cursor = conn.cursor()

cursor.execute(
    "PRAGMA table_info(attendance)"
)

columns = cursor.fetchall()

print("\n=== ATTENDANCE TABLE COLUMNS ===\n")

for column in columns:
    print(column)

conn.close()