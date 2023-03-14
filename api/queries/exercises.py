from pydantic import BaseModel
from typing import List, Union
from queries.pool import pool
from queries.accounts import Error


class ExerciseIn(BaseModel):
    name: str
    type: str
    muscle: str
    equipment: str
    difficulty: str
    instructions: str


class ExerciseOut(ExerciseIn):
    id: int
    workout_id: int


class ExerciseQueries:
    def create_exercise(
        self, exercise: ExerciseIn, account_id: int, workout_id: int
    ):
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO exercises
                        (name,
                        workout_id,
                        type,
                        muscle,
                        equipment,
                        difficulty,
                        instructions)
                    VALUES
                    (%s, %s, %s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        exercise.name,
                        workout_id,
                        exercise.type,
                        exercise.muscle,
                        exercise.equipment,
                        exercise.difficulty,
                        exercise.instructions,
                    ],
                )
                id = result.fetchone()[0]
                old_data = exercise.dict()
                return ExerciseOut(id=id, workout_id=workout_id, **old_data)

    def get_all_exercises(
        self, account_id: int, workout_id: int
    ) -> Union[Error, List[ExerciseOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT e.id, e.name, e.workout_id,
                            e.type, e.muscle, e.equipment, e.difficulty,
                            e.instructions
                        FROM exercises AS e
                        INNER JOIN workouts w ON e.workout_id = w.id
                        WHERE e.workout_id = %s AND w.account_id = %s
                        ORDER BY e.name
                        """,
                        [workout_id, account_id],
                    )
                    return [
                        self.record_to_exercise_out(record)
                        for record in result
                    ]
        except Exception:
            return {"message": "Could not get all exercises"}

    def delete_exercise(
        self, account_id: int, exercise_id: int, workout_id: int
    ) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM exercises
                        WHERE id = %s
                        AND workout_id = %s
                        AND workout_id IN (
                        SELECT id
                        FROM workouts
                        WHERE account_id = %s
                        );
                        """,
                        [exercise_id, workout_id, account_id],
                    )
                return True
        except Exception:
            return False

    def record_to_exercise_out(self, record):
        return ExerciseOut(
            id=record[0],
            name=record[1],
            workout_id=record[2],
            type=record[3],
            muscle=record[4],
            equipment=record[5],
            difficulty=record[6],
            instructions=record[7],
        )
