from pydantic import BaseModel
from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from typing import Union, List, Optional
from authenticator import authenticator
from queries.workouts import (
    WorkoutIn,
    WorkoutOut,
    WorkoutQueries,

)

router = APIRouter()
@router.get("/api/protected", response_model=bool)
async def get_protected(
  account_data: dict = Depends(authenticator.get_current_account_data),
):
  return True


@router.post("/workouts", response_model = Union[WorkoutOut, Error])
async def create_workout(
  account_data: dict = Depends(authenticator.get_current_account_data)
):
  if workout is None:
      response.status_code = 400
  return repo.create(workout)
