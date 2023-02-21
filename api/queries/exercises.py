from pydantic import BaseModel
from typing import List, Union, Optional
from queries.pool import pool
from queries.accounts import Error
from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
import requests
import os

class ExerciseIn(BaseModel):
    name: str

class ExerciseOut(BaseModel):
    id: int
    name: str
    workout_id: int


class ExerciseQueries:
    def create(self, exercise: ExerciseIn, workout_id: int):
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO exercises
                    (name, workout_id)
                    VALUES
                    (%s, %s)
                    RETURNING id;
                    """,
                    [
                    exercise.name,
                    exercise.workout_id,
                    ]
                )
                id = result.fetchone()[0]
                old_data = exercise.dict()
                return ExerciseOut(id=id, workout_id=workout_id, **old_data)


    def get_all_exercises(self):
        result = requests.get('https://api.api-ninjas.com/v1/exercises', headers={"X-Api-Key": os.environ["NINJA_KEY"]})
        data = result.json()
        return data
