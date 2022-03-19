#this is important, you can't import from an external folder without this
import sys, os
sys.path.append(os.path.realpath(".."))
# sys.path.append(os.path.realpath("."))

import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.exceptions import RequestValidationError
from fastapi.responses import PlainTextResponse
from fastapi.middleware.cors import CORSMiddleware

from shared.helpers import Helpers
from shared.constants import Constants

from routes import projects

h = Helpers()
c = Constants()

app = FastAPI(
	title = "LOPEAS API",
	description = "Local Personal Assistant API",
	version = "1.0.0",
	contact= {
		"name": "Necmettin Begiter",
		"email": "nbegiter@gmail.com",
		"url": "https://lopeas.net"
	},
	openapi_tags=[
		{"name":"projects", "description":"Projects"},
	],
	docs_url="/docs",
	redoc_url="/redoc",
	openapi_url="/openapi.json"
)

app.add_middleware(CORSMiddleware, allow_origins="*", allow_credentials=True, allow_methods=["*"], allow_headers=["*"],)
@app.get("/api/", tags=["root"], include_in_schema=False)
def root():
	return h.err(303, {"url":c.docsurl})


app.include_router(projects.router)


if __name__ == "__main__":
	uvicorn.run(app, host="0.0.0.0", port=8000)
