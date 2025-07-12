import os
import logging
from dotenv import load_dotenv
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timezone

from fastapi.staticfiles import StaticFiles

from fastapi import HTTPException
from starlette.exceptions import HTTPException as StarletteHTTPException

from .fish.server import routes
from .fish.utils.logs import CustomLogFormatter

load_dotenv()

ch = logging.StreamHandler()
ch.setFormatter(CustomLogFormatter())

logger = logging.getLogger()
logger.addHandler(ch)

if os.getenv("DEBUG") == "True":
    logger.setLevel(logging.DEBUG)

class SPAStaticFiles(StaticFiles):
    async def get_response(self, path: str, scope):
        try:
            return await super().get_response(path, scope)
        except (HTTPException, StarletteHTTPException) as ex:
            if ex.status_code == 404:
                return await super().get_response("index.html", scope)
            else:
                raise ex

app = FastAPI(debug=os.getenv("DEBUG") == "True")
app.include_router(routes.router)

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/", SPAStaticFiles(directory="dist", html=True), name="spa-static-files")

@app.get("/health")
def health():
    return { "Hello": "World", "timestamp": datetime.now(timezone.utc) }
