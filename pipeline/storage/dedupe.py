import hashlib

class PipelineDeduplicator:
    def __init__(self):
        self.seen_hashes = set()

    def generate_record_hash(self, record: dict) -> str:
        """
        Generates a unique deterministic string representing a salary log data entry.
        """
        raw_str = f"{record.get('company_name','')}|{record.get('role','')}|{record.get('base_salary',0)}|{record.get('currency','')}|{record.get('years_of_exp',0)}"
        return hashlib.md5(raw_str.lower().strip().encode("utf-8")).hexdigest()

    def is_duplicate(self, record: dict) -> bool:
        record_hash = self.generate_record_hash(record)
        if record_hash in self.seen_hashes:
            print(f"[Deduplicator]: Duplicate record dropped -> Hash: {record_hash}")
            return True
        self.seen_hashes.add(record_hash)
        return False