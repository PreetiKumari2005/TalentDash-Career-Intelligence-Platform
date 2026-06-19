import re

class SalaryParser:
    @staticmethod
    def clean_monetary_string(amount_str: str) -> float:
        """
        Regex-based fallback parsing clean string structures like '$140k' or '12,00,000' into explicit floats.
        """
        if isinstance(amount_str, (int, float)):
            return float(amount_str)
            
        cleaned = amount_str.lower().replace(",", "").replace("$", "").strip()
        
        multiplier = 1.0
        if "k" in cleaned:
            multiplier = 1000.0
            cleaned = cleaned.replace("k", "")
        elif "m" in cleaned:
            multiplier = 1000000.0
            cleaned = cleaned.replace("m", "")
            
        try:
            # Extract numbers only
            numbers_only = re.findall(r"[-+]?\d*\.\d+|\d+", cleaned)
            if numbers_only:
                return float(numbers_only[0]) * multiplier
        except ValueError:
            pass
            
        return 0.0