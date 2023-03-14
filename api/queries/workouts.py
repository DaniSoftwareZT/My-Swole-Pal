from pydantic import BaseModel
from typing import List, Union, Optional
from queries.pool import pool
from queries.accounts import Error


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
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO workouts
                    (name, image_url, account_id)
                    VALUES
                    (%s, %s, %s)
                    RETURNING id;
                    """,
                    [workout.name, workout.image_url, account_id],
                )
                id = result.fetchone()[0]
                old_data = workout.dict()
                return WorkoutOut(id=id, account_id=account_id, **old_data)

    def get_all(self, account_id: int) -> Union[Error, List[WorkoutOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, name, image_url, account_id
                        FROM workouts
                        WHERE account_id = %s
                        ORDER BY name
                        """,
                        [account_id],
                    )
                    return [
                        self.record_to_workout_out(record) for record in result
                    ]
        except Exception:
            return {"message": "Could not get all accounts"}

    def get_one_workout(
        self, account_id: int, id: int
    ) -> Optional[WorkoutOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, name, image_url, account_id
                        FROM workouts
                        WHERE (account_id = %s AND id = %s)
                        ORDER BY name
                        """,
                        [account_id, id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_workout_out(record)
        except Exception:
            return {"message": "Could not get workout"}

    def update_workout(
        self, account_id: int, id: int, workout: WorkoutIn
    ) -> Optional[WorkoutOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE workouts
                        SET name=%s
                        , image_url=%s
                        , account_id=%s
                        WHERE (id=%s AND account_id=%s)
                        """,
                        [
                            workout.name,
                            workout.image_url,
                            account_id,
                            id,
                            account_id,
                        ],
                    )
                return self.workout_in_to_out(id, workout, account_id)
        except Exception:
            return {"message": "Could not update workout"}

    def workout_in_to_out(self, id: int, workout: WorkoutIn, account_id: int):
        old_data = workout.dict()
        return WorkoutOut(id=id, **old_data, account_id=account_id)

    def record_to_workout_out(self, record):
        return WorkoutOut(
            id=record[0],
            name=record[1],
            image_url=record[2],
            account_id=record[3],
        )

    def delete_workout(self, account_id: int, id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM workouts
                        WHERE id=%s AND account_id=%s
                        """,
                        [id, account_id],
                    )
                return True
        except Exception:
            return False
