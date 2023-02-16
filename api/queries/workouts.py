from pydantic import BaseModel
from queries.pool import pool
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

class WorkoutOut(BaseModel):
    id: int
    name: str
    image_url: str
    account_id: int

class WorkoutQueries:
   def create(self, workout: WorkoutIn, account_id: int):
    # connec to the database
    with pool.connection() as conn:
      # get a cursor (something to run sql with)
      with conn.cursor() as db:
        # run our insert statement
        result = db.execute(
          """
          INSERT INTO workouts
            (name, image_url, account_id)
          VALUES
            (%s, %s, %s)
          RETURNING id;
          """,
          [
            workout.name,
            workout.image_url,
            account_id
          ]
        )
        id = result.fetchone()[0]
        old_data = workout.dict()
        print("ID", id)
        print(old_data)
        return WorkoutOut(id=id, account_id=account_id, **old_data)
        # return new data
        #return self.account_in_to_out(id, account)
