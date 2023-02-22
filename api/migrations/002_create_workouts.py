steps=[
  [
    """
    CREATE TABLE workouts(
        id SERIAL PRIMARY KEY NOT NULL,
        name VARCHAR(100) NOT NULL,
        image_url VARCHAR(500),
        account_id INTEGER NOT NULL REFERENCES accounts("id") ON DELETE CASCADE
    );
    """,
    """
    DROP TABLE workouts;
    """
  ]
]
