#this is important, makes it very easy to import things
import sys
sys.path.append(".")

from fastapi import FastAPI, HTTPException
from fastapi.exceptions import RequestValidationError
from fastapi.responses import PlainTextResponse

from shared.helpers import Helpers
from shared.constants import Constants

from routes import projects

h = Helpers()
c = Constants()

app = FastAPI(
	title = "PErsonal ASsistant",
	description = "begiter.net",
	version = "1.0.0",
	contact= {
		"name": "Necmettin Begiter",
		"email": "nbegiter@gmail.com",
		"url": "https://begiter.net/"
	},
	openapi_tags=[
		{"name":"projects", "description":"Projects"},
	],
	docs_url="/api/v1/docs",
	redoc_url="/api/v1/redoc",
	openapi_url="/api/v1/openapi.json"
)

app.include_router(projects.router)
