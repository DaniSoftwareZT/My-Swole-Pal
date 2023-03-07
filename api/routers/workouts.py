# from pydantic import BaseModel
from fastapi import (
    Depends,
    # HTTPException,
    # status,
    Response,
    APIRouter,
    # Request,
)
from typing import Optional
from authenticator import authenticator
from queries.workouts import (
    WorkoutIn,
    WorkoutOut,
    WorkoutQueries,
)

router = APIRouter()


@router.post("/api/workouts", tags=["workouts"])
async def create_workout(
    workout_in: WorkoutIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: WorkoutQueries = Depends()
):
    print('account_data', account_data)
    return repo.create(workout=workout_in, account_id=account_data['id'])


@router.get("/api/workouts", tags=["workouts"])
async def get_workouts(
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: WorkoutQueries = Depends()
):
    return repo.get_all(account_id=account_data['id'])


@router.get(
      "/api/workouts/{id}",
      response_model=Optional[WorkoutOut],
      tags=["workouts"])
async def get_one_workout(
    id: int,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: WorkoutQueries = Depends()
) -> WorkoutOut:
    print(id)
    workout = repo.get_one_workout(account_id=account_data['id'], id=id)
    print("workout", workout)
    if workout is None:
        response.status_code = 404
    return workout


@router.put(
      "/api/workouts/{id}",
      response_model=Optional[WorkoutOut],
      tags=["workouts"])
def update_workout(
  id: int,
  workout: WorkoutIn,
  account_data: dict = Depends(authenticator.get_current_account_data),
  repo: WorkoutQueries = Depends(),
) -> WorkoutOut:
    return repo.update_workout(
        account_id=account_data['id'],
        id=id,
        workout=workout)


@router.delete(
        "/api/workouts/{id}",
        response_model=bool,
        tags=["workouts"])
def delete_workout(
  id: int,
  account_data: dict = Depends(authenticator.get_current_account_data),
  repo: WorkoutQueries = Depends(),
) -> bool:
    print("HELLO BACKEND")
    return repo.delete_workout(account_id=account_data['id'], id=id)
