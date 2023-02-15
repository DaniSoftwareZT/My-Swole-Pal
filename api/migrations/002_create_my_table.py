steps=[
  [
    """
    CREATE TABLE accounts(
      id SERIAL PRIMARY KEY NOT NULL,
      username VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      hashed_password VARCHAR(100) NOT NULL
    );
    """,
    """
    DROP TABLE accounts;
    """
  ]
]
