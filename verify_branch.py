import sqlite3

conn = sqlite3.connect("test.db")
cursor = conn.cursor()

cursor.execute("""
SELECT sql
FROM sqlite_master
WHERE type='table'
AND name='users'
""")

result = cursor.fetchone()

print("\n=== USERS TABLE DEFINITION ===\n")
print(result[0])

conn.close()