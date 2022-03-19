import os

class ServerType:
	sqlite: str = "sqlite"
	my: str = "mysql"
	pg: str = "postgresql"


ST = ServerType()


if os.environ.get("db_type") == "mysql":
	_server = "mysql"
	import mysql.connector
elif os.environ.get("db_type") == "postgresql":
	_server = "postgresql"
	import psycopg2
	import psycopg2.extras
else:
	_server = "sqlite"
	import sqlite3

	
class DB:
	con: None
	cur: None

	# this attribute and method make this a singleton
	_instance = None
	def __new__(cls, *args, **kwargs):
		if not isinstance(cls._instance, cls):
			cls._instance = object.__new__(cls, *args, **kwargs)
		return cls._instance

	def __init__(self):
		if _server == ST.sqlite:
			self.con = sqlite3.connect("../../data.db")
			self.con.row_factory = sqlite3.Row
			self.cur = self.con.cursor()
