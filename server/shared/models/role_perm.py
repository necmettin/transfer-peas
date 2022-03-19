from .base_record import BaseRecord


""" permissions for each role """
class RolePerm(BaseRecord):
	role_id: int
	perm_id: int
