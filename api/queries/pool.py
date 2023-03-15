import os
from psycopg_pool import ConnectionPool


pool = ConnectionPool(conninfo=os.getenv("DATABASE_URL", ""))
