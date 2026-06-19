import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

class DatabaseClient:
    def __init__(self):
        self.db_url = os.getenv("DATABASE_URL")

    def execute_raw_query(self, query: str, values: tuple = None) -> list:
        """
        Direct raw relational engine interaction hook bypassed from Next.js layers.
        """
        if not self.db_url:
            print("[DB Error]: DATABASE_URL environment variable is missing.")
            return []
            
        try:
            with psycopg2.connect(self.db_url) as conn:
                with conn.cursor() as cur:
                    cur.execute(query, values)
                    if cur.description:
                        return cur.fetchall()
                    conn.commit()
        except Exception as e:
            print(f"[DB Client Exception]: Operational query failed: {e}")
        return []