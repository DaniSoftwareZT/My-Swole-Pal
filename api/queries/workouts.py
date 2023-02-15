from pydantic import BaseModel
from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)

class WorkoutIn(BaseModel):
    name: str
    image_url: str
    account_id:

class WorkoutOut(BaseModel):
    name: str
    image_url: str
    account_id:
