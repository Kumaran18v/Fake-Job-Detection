
import sqlite3

try:
    conn = sqlite3.connect('jobcheck.db')
    cursor = conn.cursor()
    cursor.execute('ALTER TABLE predictions ADD COLUMN model_used VARCHAR DEFAULT "model_a"')
    conn.commit()
    print("Column added successfully")
except Exception as e:
    print(f"Error: {e}")
finally:
    conn.close()
