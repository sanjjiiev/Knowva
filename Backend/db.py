# db.py
import sqlite3
from typing import List, Optional

DB_FILE = "history.db"

def init_db():
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute(
        """
        CREATE TABLE IF NOT EXISTS history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id TEXT,
            prompt TEXT,
            response TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        """
    )
    conn.commit()
    conn.close()

def save_interaction(user_id: str, prompt: str, response: str):
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute("INSERT INTO history (user_id, prompt, response) VALUES (?, ?, ?)", (user_id, prompt, response))
    conn.commit()
    conn.close()

def fetch_past_prompts(user_id: str, limit: int = 50) -> List[str]:
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute("SELECT prompt || ' ||| ' || response FROM history WHERE user_id = ? ORDER BY id DESC LIMIT ?", (user_id, limit))
    rows = c.fetchall()
    conn.close()
    return [r[0] for r in rows]
# in app.py we'll call init_db() at startup