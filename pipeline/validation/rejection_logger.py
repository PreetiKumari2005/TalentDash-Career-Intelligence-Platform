import json
import os
from datetime import datetime

class RejectionLogger:
    def __init__(self):
        # Outputs an append-only JSON Lines tracking schema record error log
        self.log_path = os.path.abspath(
            os.path.join(os.path.dirname(__file__), "..", "rejections.jsonl")
        )

    def log_rejection(self, raw_data: dict, reason: str):
        payload = {
            "timestamp": datetime.utcnow().isoformat(),
            "reason": reason,
            "offending_data": raw_data
        }
        with open(self.log_path, "a") as f:
            f.write(json.dumps(payload) + "\n")
        print(f"[Pipeline Validation Block]: Logged rejection due to: {reason}")