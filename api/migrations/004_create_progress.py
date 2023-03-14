steps = [
    [
    """
    CREATE TABLE progress(
        id SERIAL PRIMARY KEY NOT NULL,
        weight VARCHAR(100) NOT NULL,
        update_date DATE NOT NULL DEFAULT CURRENT_DATE,
        notes TEXT,
        account_id INTEGER NOT NULL REFERENCES accounts("id") ON DELETE CASCADE
    );
    """,
    """
    DROP TABLE workouts;
    """
    ]
]
