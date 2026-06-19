from pydantic import ValidationError
from validation.models import PipelineSalarySchema
from validation.rejection_logger import RejectionLogger

class DataValidator:
    def __init__(self):
        self.logger = RejectionLogger()

    def validate_record(self, data: dict) -> bool:
        """
        Validates the incoming dictionary structure using Pydantic. 
        Logs the failure automatically if verification drops out.
        """
        try:
            # Run validation
            PipelineSalarySchema(**data)
            return True
        except ValidationError as val_err:
            self.logger.log_rejection(data, str(val_err))
            return False