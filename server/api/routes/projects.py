import pprint
from typing import List
from fastapi import APIRouter

#models
from models.project import Project

# base application classes
from shared.helpers import Helpers

h = Helpers()

router = APIRouter(prefix="/api/projects", tags=["projects"])

@router.get("/")
async def read_projects():
	data = h.db_select("projects")
	return data

@router.post("/", response_model=List[int])
async def create_projects(records: List[Project]):
	retval = h.adding_endpoint("projects", records)
	return retval

@router.delete("/", response_model=List[int])
async def delete_projects(ids: List[int]):
	retval = h.deleting_endpoint("projects", ids)
	return retval
