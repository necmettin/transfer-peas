import datetime
from .base_record import BaseRecord
from shared.enums import ActionType


""" background actions """
class Action(BaseRecord):
	action_typ: ActionType # what the cronjob will be
	object_typ: ActionType # what the cronjob will be
	object_id: int
	started_at: datetime.datetime
	action_ms: int # how long did it take
