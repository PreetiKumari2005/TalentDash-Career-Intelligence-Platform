import json
from typing import Dict, Any, Optional

def clean_and_parse_json(raw_response: str) -> Optional[Dict[str, Any]]:
    """
    Cleans raw markdown-wrapped or raw string JSON from an LLM response 
    and handles potential decoding errors gracefully.
    """
    try:
        cleaned = raw_response.strip()
        if cleaned.startswith("```json"):
            cleaned = cleaned.split("```json")[1]
        if cleaned.endswith("```"):
            cleaned = cleaned.rsplit("```", 1)[0]
        
        return json.loads(cleaned.strip())
    except (json.JSONDecodeError, IndexError) as e:
        print(f"[LLM Parser Error]: Failed to format response string into dictionary. Details: {e}")
        return None