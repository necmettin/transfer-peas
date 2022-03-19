from .base_record import BaseRecord


""" Application and company settings """
class Setting(BaseRecord):
	company_id: int = 0
	slug: str
	value: str
