from .base_record import BaseRecord
from typing import Optional

""" permissions """
class Perm(BaseRecord):
	slug: str
	title: Optional[str]
