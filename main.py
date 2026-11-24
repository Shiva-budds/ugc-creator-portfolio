"""FastAPI backend: serves the single-page portfolio and its static files."""
from pathlib import Path

from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

BASE_DIR = Path(__file__).resolve().parent

app = FastAPI(title="UGC Creator Portfolio", docs_url=None, redoc_url=None, openapi_url=None)


@app.get("/", include_in_schema=False)
def index() -> FileResponse:
    return FileResponse(BASE_DIR / "index.html")


@app.get("/api/health")
def health() -> dict:
    return {"status": "ok"}


# Mounted after the routes above so "/" and "/api/health" keep priority.
app.mount("/static", StaticFiles(directory=BASE_DIR / "static"), name="static")
app.mount("/assets", StaticFiles(directory=BASE_DIR / "assets"), name="assets")
