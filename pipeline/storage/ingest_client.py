import os
import requests
from dotenv import load_dotenv

load_dotenv()

class IngestClient:
    def __init__(self):
        self.api_endpoint = os.getenv("NEXT_API_ENDPOINT", "http://localhost:3000/api/ingest-salary")
        self.pipeline_secret = os.getenv("PIPELINE_SHARED_SECRET", "pipeline-dev-secret-token")

    def forward_to_nextjs(self, clean_record: dict) -> bool:
        """
        Maps structural pipeline outputs straight into Next.js App Router API transaction states.
        """
        payload = {
            "companyName": clean_record.get("company_name"),
            "role": clean_record.get("role"),
            "level": clean_record.get("level"),
            "baseSalary": float(clean_record.get("base_salary", 0)),
            "variablePay": float(clean_record.get("variable_pay", 0)),
            "equityPay": float(clean_record.get("equity_pay", 0)),
            "currency": clean_record.get("currency", "USD"),
            "yearsOfExp": float(clean_record.get("years_of_exp", 0.0)),
            "location": clean_record.get("location", "Remote"),
            "pipelineSecret": self.pipeline_secret
        }

        try:
            response = requests.post(self.api_endpoint, json=payload, timeout=8)
            if response.status_code == 201:
                return True
            print(f"[Ingest Error]: Next.js rejected record with status [{response.status_code}]: {response.text}")
        except requests.RequestException as e:
            print(f"[Ingest Exception]: Failed to stream entry to Next.js API instance: {e}")
        return False