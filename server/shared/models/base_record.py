import datetime
from pydantic import BaseModel
from typing import Optional


""" base record type """
class BaseRecord(BaseModel):
	id: Optional[int] = 0
	is_deleted: Optional[int] = 0
	created_at: Optional[datetime.datetime]
	updated_at: Optional[datetime.datetime]
