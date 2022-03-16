import datetime
from models.base_record import BaseRecord

""" projects """
class Project(BaseRecord):
	parent_id: int = 0
	title: str
