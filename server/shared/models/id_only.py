from pydantic import BaseModel
from .base_record import BaseRecord

""" user groups """
class IdOnly(BaseModel):
	id: int
