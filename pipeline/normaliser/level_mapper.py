class LevelMapper:
    @staticmethod
    def standardise_level(level_str: str) -> str:
        if not level_str:
            return "IC"
        
        clean_level = level_str.strip().upper()
        
        # Map common engineering levels to common structural brackets
        if any(x in clean_level for x in ["L3", "SWE1", "JUNIOR", "ASSOC"]):
            return "L3 (Entry)"
        if any(x in clean_level for x in ["L4", "SWE2", "MID", "INTERMEDIATE"]):
            return "L4 (Mid)"
        if any(x in clean_level for x in ["L5", "SENIOR", "SR", "SWE3"]):
            return "L5 (Senior)"
        if any(x in clean_level for x in ["L6", "STAFF", "PRINCIPAL"]):
            return "L6 (Staff)"
            
        return clean_level