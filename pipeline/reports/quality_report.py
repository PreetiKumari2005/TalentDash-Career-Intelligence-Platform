import os

class QualityReporter:
    def __init__(self):
        self.processed = 0
        self.ingested = 0
        self.rejected = 0

    def log_metrics(self, processed: int, ingested: int, rejected: int):
        self.processed += processed
        self.ingested += ingested
        self.rejected += rejected

    def generate_terminal_summary(self):
        print("\n" + "="*50)
        print("          TALENTDASH DATA PIPELINE RUN REPORT      ")
        print("="*50)
        print(f" Total Raw Items Identified : {self.processed}")
        print(f" Successfully Ingested      : {self.ingested}")
        print(f" Blocked / Validation Drops : {self.rejected}")
        
        success_rate = (self.ingested / self.processed * 100) if self.processed > 0 else 0.0
        print(f" Pipeline Success Rate      : {success_rate:.2f}%")
        
        rejections_file = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "rejections.jsonl"))
        if os.path.exists(rejections_file) and os.path.getsize(rejections_file) > 0:
            print(f" Review failed validation contexts in: {rejections_file}")
        print("="*50 + "\n")