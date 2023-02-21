steps=[
    [
    """
    CREATE TABLE exercises(
        id SERIAL PRIMARY KEY NOT NULL,
        name VARCHAR(100) NOT NULL,
        workout_id INTEGER NOT NULL REFERENCES workouts("id")

    );
    """,
    """
    DROP TABLE exercises;
    """
    ]
]
