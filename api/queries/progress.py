from pydantic import BaseModel
from datetime import date
from queries.pool import pool
from typing import List, Union, Optional
from queries.accounts import Error



class ProgressIn(BaseModel):
    weight: int
    update_date: date
    notes: str

class ProgressOut(BaseModel):
    id: int
    weight: int
    update_date: date
    notes: str
    account_id: int

class ProgressQueries:
    def create_progress_record(self, progress: ProgressIn, account_id: int):
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO progress
                    (weight, update_date, notes, account_id)
                    VALUES
                    (%s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        progress.weight,
                        progress.update_date,
                        progress.notes,
                        account_id
                    ]
                )
                id = result.fetchone()[0]
                old_data = progress.dict()
                return ProgressOut(id=id, account_id=account_id, **old_data)

    def get_all_progress(self, account_id: int) -> Union[Error, list[ProgressOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, weight, update_date, notes, account_id
                        FROM progress
                        WHERE account_id = %s
                        ORDER BY update_date
                        """,
                        [account_id],
                    )
                    return [
                        self.record_to_progress_out(record)
                        for record in result
                    ]
        except Exception as e:
            return {"message": "Could not get all progress records"}


    def get_one_progress_record(self, account_id: int, id: int) -> Optional[ProgressOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, weight, update_date, notes, account_id
                        FROM progress
                        WHERE (account_id= %s AND id= %s)
                        """,
                        [account_id, id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_progress_out(record)
        except Exception as e:
            return {"message": "Could not get progress record"}

    def update_progress_record(
            self,
            account_id: int,
            id: int,
            progress: ProgressIn) -> Optional[ProgressOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE progress
                        SET weight=%s
                        , update_date=%s
                        , notes=%s
                        , account_id=%s
                        WHERE (id=%s AND account_id=%s)
                        """,
                        [
                            progress.weight,
                            progress.update_date,
                            progress.notes,
                            account_id,
                            id,
                            account_id
                        ]
                    )
                return self.progress_in_to_out(id, progress, account_id)
        except Exception as e:
            return {"message": "Could not update workout"}

    def delete_progress_record(self, account_id: int, id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM progress
                        WHERE id=%s AND account_id=%s
                        """,
                        [id, account_id]
                    )
                return True
        except Exception as e:
            return False

    def progress_in_to_out(self, id: int, progress: ProgressIn, account_id: int):
        old_data = progress.dict()
        return ProgressOut(id=id, **old_data, account_id=account_id)

    def record_to_progress_out(self, record):
        return ProgressOut(
            id=record[0],
            weight=record[1],
            update_date=record[2],
            notes=record[3],
            account_id=record[4]
        )
