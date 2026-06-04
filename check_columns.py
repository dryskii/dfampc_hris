import sqlite3
import os

db_path = os.path.abspath("test.db")

print("Database:", db_path)

conn = sqlite3.connect("test.db")
cursor = conn.cursor()

cursor.execute("PRAGMA table_info(users)")

columns = cursor.fetchall()

print("\n=== USERS TABLE COLUMNS ===\n")

for col in columns:
    print(col)

conn.close()