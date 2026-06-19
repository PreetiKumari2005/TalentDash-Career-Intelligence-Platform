import os
import requests
from dotenv import load_dotenv
from validation.models import RawSalaryPayload

load_dotenv()

NEXT_API_ENDPOINT = os.getenv("NEXT_API_ENDPOINT", "http://localhost:3000/api/salaries")

def process_and_ingest_pipeline():
    print("[Pipeline] Starting compensation parsing sync...")
    
    # Mock data output representing what your scrapers + normalizers extract
    extracted_data = [
        {"company_name": "Google", "role": "Software Engineer", "base_salary": 145000.0, "currency": "USD", "location": "Mountain View, CA", "years_of_exp": 3.5},
        {"company_name": "Meta", "role": "Data Scientist", "base_salary": 165000.0, "currency": "USD", "location": "Menlo Park, CA", "years_of_exp": 5.0}
    ]

    for entity in extracted_data:
        try:
            # Validate payload schema matching operational definitions
            validated_item = RawSalaryPayload(**entity)
            
            # Send payload into Next.js App Endpoint
            response = requests.post(NEXT_API_ENDPOINT, json=validated_item.model_dump())
            if response.status_code == 201:
                print(f" Successfully ingested data entry for: {validated_item.company_name}")
            else:
                print(f" Failed response from API [{response.status_code}]: {response.text}")
                
        except Exception as ve:
            print(f" Pipeline Validation Drop: Blocked corrupt schema row {entity}. Error: {ve}")

if __name__ == "__main__":
    process_and_ingest_pipeline()