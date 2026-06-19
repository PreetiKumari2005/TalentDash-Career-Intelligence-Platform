import os
from openai import OpenAI
from dotenv import load_dotenv
from llm.prompts import SYSTEM_NORMALISATION_PROMPT
from llm.response_parser import clean_and_parse_json

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

LLM_SCHEMA = {
    "type": "object",
    "properties": {
        "company_name": {"type": "string"},
        "role": {"type": "string"},
        "level": {"type": "string", "nullable": True},
        "base_salary": {"type": "number"},
        "variable_pay": {"type": "number"},
        "equity_pay": {"type": "number"},
        "currency": {"type": "string"}
    },
    "required": ["company_name", "role", "level", "base_salary", "variable_pay", "equity_pay", "currency"],
    "additionalProperties": False
}

def normalise_text_chunk(raw_input: str) -> list:
    """
    Sends raw messy scrapings to the LLM and requests structured schema results back.
    """
    if not os.getenv("OPENAI_API_KEY"):
        print("[LLM Warn]: OPENAI_API_KEY is missing. Returning an empty sequence.")
        return []

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": SYSTEM_NORMALISATION_PROMPT},
                {"role": "user", "content": f"Extract and structure the following data row: '{raw_input}'"}
            ],
            response_format={
                "type": "json_schema",
                "json_schema": {
                    "name": "salary_normalizer",
                    "schema": LLM_SCHEMA,
                    "strict": True
                }
            }
        )
        parsed = clean_and_parse_json(response.choices[0].message.content)
        return [parsed] if parsed else []
    except Exception as e:
        print(f"[LLM Error]: Generation failed. {e}")
        return []