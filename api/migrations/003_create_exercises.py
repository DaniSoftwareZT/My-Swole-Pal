steps = [
    [
        """
    CREATE TABLE exercises(
        id SERIAL PRIMARY KEY NOT NULL,
        name VARCHAR(100) NOT NULL,
        workout_id INTEGER NOT NULL REFERENCES
          workouts("id") ON DELETE CASCADE,
        type VARCHAR(100) NOT NULL,
        muscle VARCHAR(100) NOT NULL,
        equipment VARCHAR(100) NOT NULL,
        difficulty VARCHAR(100) NOT NULL,
        instructions TEXT NOT NULL
    );
    """,
        """
    DROP TABLE exercises;
    """,
    ]
]
