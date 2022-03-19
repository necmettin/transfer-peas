from enum import Enum, unique


""" used in both actions table and oplogs table (because an action can be queued for later or performed) """	
class ActionType(str, Enum):
	at_create = "at_create" # create question, create session
	at_read = "at_read"
	at_update = "at_update"
	at_delete = "at_delete"
	at_answer = "at_answer" # answer question
	at_login = "at_login"
	at_logout = "at_logout"
	at_start = "at_start"
	at_end = "at_end"
	at_cron = "at_cron"
	at_assess: "at_assess" # assess (score) a candidate's finished session
	at_createpdf: "at_createpdf" # create pdf from a finished session

	def str (self):
		return str(self.value)


""" used in oplogs and action queue; in simplest terms, the list of objects (combines with actiontype, ie. actiontype is create, and actionobject is user) """	
class ObjectType(str, Enum):
	ot_page: "ot_page"

	def str (self):
		return str(self.value)
