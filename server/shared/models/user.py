from .base_record import BaseRecord
from typing import Optional


""" list of users """
class User(BaseRecord):
	partner_id: int
	email: str = ""
	phone: Optional[str] = ""
	pwdhash: Optional[str] = None
	token: Optional[str] = None
