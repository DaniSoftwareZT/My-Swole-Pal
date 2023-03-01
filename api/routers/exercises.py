# from pydantic import BaseModel
from fastapi import (
    Depends,
    # HTTPException,
    # status,
    # Response,
    APIRouter,
    # Request,
)
# from typing import Union, List, Optional
from authenticator import authenticator
from queries.exercises import (
    ExerciseIn,
    # ExerciseOut,
    ExerciseQueries,
)

router = APIRouter()


@router.get("/api/workouts/{workout_id}/exercises", tags=["exercises"])
async def get_exercises(
    workout_id: int,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: ExerciseQueries = Depends()
):
    return repo.get_all_exercises(
        account_id=account_data["id"],
        workout_id=workout_id)


@router.post("/api/workouts/{workout_id}/exercises", tags=["exercises"])
async def create_exercise(
    workout_id: int,
    exercise_in: ExerciseIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: ExerciseQueries = Depends(),
):
    print('account_data', account_data)
    return repo.create_exercise(
        exercise=exercise_in,
        account_id=account_data["id"],
        workout_id=workout_id)


@router.delete(
        "/api/workouts/{workout_id}/exercises/{exercise_id}",
        response_model=bool,
        tags=["exercises"])
def delete_exercise(
  workout_id: int,
  exercise_id: int,
  account_data: dict = Depends(authenticator.get_current_account_data),
  repo: ExerciseQueries = Depends(),
) -> bool:
    return repo.delete_exercise(
        account_id=account_data['id'],
        exercise_id=exercise_id,
        workout_id=workout_id)
