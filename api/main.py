from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import workouts, exercises, accounts, searches
from authenticator import authenticator
import os

app = FastAPI()
app.include_router(authenticator.router)
app.include_router(workouts.router)
app.include_router(accounts.router)
app.include_router(exercises.router)
app.include_router(searches.router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("CORS_HOST", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/launch-details")
def launch_details():
    return {
        "launch_details": {
            "year": 2023,
            "month": 3,
            "day": "15",
            "hour": 19,
            "min": 0,
            "tz:": "PST",
        }
    }
