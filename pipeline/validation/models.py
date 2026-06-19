from pydantic import BaseModel, Field
from typing import Optional

class PipelineSalarySchema(BaseModel):
    company_name: str = Field(..., min_length=1)
    role: str = Field(..., min_length=1)
    level: Optional[str] = None
    base_salary: float = Field(..., gt=0)
    variable_pay: float = Field(default=0.0, ge=0)
    equity_pay: float = Field(default=0.0, ge=0)
    currency: str = Field(..., min_length=3, max_length=3)