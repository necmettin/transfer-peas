import datetime
from typing import Dict
from .base_record import BaseRecord
from shared.enums import ActionType, ObjectType
from pydantic import Json


""" action log for each user, test, session, question """
class OpLog(BaseRecord):
	attendee_id: int = 0
	user_id: int = 0
	action_typ: ActionType # what was done with the main object
	object_typ: ObjectType # the main object that was modified
	object_id: int = 0
	completed_ms: int # how long did it take
	changes: Json[Dict, Dict]
