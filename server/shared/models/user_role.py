from .base_record import BaseRecord


""" groups users belong to """
class UserRole(BaseRecord):
	user_id: int
	role_id: int
