from .base_record import BaseRecord


""" permissions specific to users (not needed normally) """
class UserPerm(BaseRecord):
	user_id: int
	perm_id: int
