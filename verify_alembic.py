import sqlite3

conn = sqlite3.connect("test.db")
cursor = conn.cursor()

cursor.execute("""
SELECT version_num
FROM alembic_version
""")

print("\n=== ALEMBIC VERSION ===\n")
print(cursor.fetchall())

conn.close()