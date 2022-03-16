import os, sys, datetime
from typing import Any
# import mysql.connector
import psycopg2
import psycopg2.extras

from fastapi.responses import JSONResponse as json

from models.role import Role
from models.id_only import IdOnly
from shared.constants import Constants

c = Constants()

class Helpers:
	_db: None
	
	# this attribute and method make this a singleton
	_instance = None
	def __new__(cls, *args, **kwargs):
		if not isinstance(cls._instance, cls):
			cls._instance = object.__new__(cls, *args, **kwargs)
		return cls._instance

	def __init__(self):
		self._db = psycopg2.connect(host=self.env("db_server", "localhost"), database=self.env("db_name", "t4"), user=self.env("db_user", "t4"), password=self.env("db_password", "t4"))
		self._cursor = self._db.cursor(cursor_factory = psycopg2.extras.RealDictCursor)
	
	def field2tuple(self, rows, fieldname="id"):
		lst = [row[fieldname] for row in rows]
		return tuple(lst)
	
	def field2key(self, rows, fieldname="id"):
		lst = {row[fieldname]:row for row in rows}
		return lst
	
	def now(self):
		dt = datetime.datetime.now()
		return dt.strftime('%Y-%m-%d %H:%M:%S')
	
	def db_select(self, tablename, conds={}):
		qstr = f"SELECT * FROM {tablename} "
		if conds:
			qstr += "WHERE "
			for key in conds:
				if key[-4:] == "__ne":
					qstr += f"{key[:-4]} != %({key})s AND "
				elif key[-4:] == "__gt":
					qstr += f"{key[:-4]} > %({key})s AND "
				elif key[-4:] == "__in":
					qstr += f"{key[:-4]} in %({key})s AND "
				elif key[-5:] == "__gte":
					qstr += f"{key[:-5]} >= %({key})s AND "
				elif key[-4:] == "__lt":
					qstr += f"{key[:-4]} < %({key})s AND "
				elif key[-5:] == "__lte":
					qstr += f"{key[:-5]} <= %({key})s AND "
				else:
					qstr += f"{key} = %({key})s AND "
			qstr = qstr[:-4] + " ORDER BY Id DESC"
			print(qstr, conds)
			self._cursor.execute(qstr, conds)
		else:
			qstr += "ORDER BY Id DESC"
			self._cursor.execute(qstr)
		return self._cursor.fetchall()
		
	def db_insert(self, tablename, data):
		data = data.dict()
		del data["id"]
		data["created_at"] = self.now()
		data["updated_at"] = self.now()
		qstr = f"INSERT INTO {tablename} ("
		valuestr = ""
		values = []
		for colname, colvalue in data.items():
			qstr += f"{colname}, "
			valuestr += "%s, "
			if type(colvalue) == datetime.datetime:
				colvalue = colvalue.strftime('%Y-%m-%d %H:%M:%S')
			values.append(colvalue)
		qstr = qstr[:-2] + ") values (" + valuestr[:-2] + ")"
		try:
			self._cursor.execute(qstr, values)
			self._db.commit()
			return True
		except:
			print(sys.exc_info())
			return False
			# raise
	
	def db_delete(self, tablename, id):
		qstr = f"UPDATE {tablename} SET is_deleted=1 WHERE id=%s"
		try:
			self._cursor.execute(qstr, (id,))
			self._db.commit()
			return True
		except:
			print(sys.exc_info())
			return False
	
	def listing_endpoint(self, tablename, additional_conds={}):
		if "is_deleted" not in additional_conds:
			additional_conds["is_deleted"] = 0
		return self.db_select(tablename, additional_conds)
	
	def adding_endpoint(self, tablename, records):
		for record in records:
			self.db_insert(tablename, record)
		return True
	
	def deleting_endpoint(self, tablename, ids):
		for id in ids:
			self.db_delete(tablename, id)
		return ids
	
	def env(self, varname, default_value):
		return os.getenv(varname, default_value)
	
	def err(self, errcode: int, data:Any):
		return json(data, status_code=errcode)
