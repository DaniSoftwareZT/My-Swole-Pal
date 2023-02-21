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
from queries.exercises import (
    ExerciseIn,
    ExerciseOut,
    ExerciseQueries,
)

router = APIRouter()


@router.get("/api/workouts/{id}/exercises", tags=["exercises"])
async def get_exercises(
    repo: ExerciseQueries = Depends()
):
    return repo.get_all_exercises()



@router.post("/api/workouts/{id}/exercises", tags=["exercises"])
async def create_workout(
    workout_id: int,
    exercise_in: ExerciseIn,
    # account_data: dict= Depends(authenticator.get_current_account_data),
    repo: ExerciseQueries = Depends(),
):
    return repo.create(exercise=exercise_in, workout_id=id)
