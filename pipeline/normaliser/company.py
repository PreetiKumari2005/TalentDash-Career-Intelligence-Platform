import json
import os

class CompanyNormaliser:
    def __init__(self):
        self.aliases = {}
        path = os.path.join(os.path.dirname(__file__), "aliases.json")
        if os.path.exists(path):
            with open(path, "r") as f:
                self.aliases = json.load(f).get("companies", {})

    def clean_name(self, name: str) -> str:
        normalized = name.strip().lower()
        # Direct lookup mapping match
        if normalized in self.aliases:
            return self.aliases[normalized]
        
        # Clean standard business suffixes
        for suffix in [" inc", " corp", " llc", " pvt ltd", " ltd", " solutions"]:
            if normalized.endswith(suffix):
                normalized = normalized.split(suffix)[0]
                
        return normalized.strip().title()