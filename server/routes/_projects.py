import pprint
from typing import List
from fastapi import APIRouter
from models.project import Project
from shared.helpers import Helpers

h = Helpers()

router = APIRouter(prefix="/api/v1/projects", tags=["projects"])

@router.get("/")
async def read_projects():
	projects = h.db_select("projects", {"parent_id":0})
	return projects

@router.post("/", response_model=List[int])
async def create_projects(records: List[Project]):
	retval = h.adding_endpoint("projects", records)
	return retval

@router.delete("/", response_model=List[int])
async def delete_projects(ids: List[int]):
	retval = h.deleting_endpoint("projects", ids)
	return retval
