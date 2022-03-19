from enum import Enum, unique

""" types of tests (myers-briggs etc) """
@unique
class TestType(str, Enum):
	ttMyersBriggs = "ttMyersBriggs"

	def __str__(self):
		return str(self.value)


""" types of questions (currently only multichoice) """
@unique
class QuestionType(str, Enum):
	qt_text = "qt_text" # mc meaning multiple choice
	qt_images = "qt_images"

	def str (self):
		return str(self.value)



""" states of answering sessions """
class SessionState(str, Enum):
	ss_waiting = "ss_waiting"
	ss_running = "ss_running"
	ss_cancelled = "ss_cancelled"
	ss_done = "ss_done"

	def str (self):
		return str(self.value)
