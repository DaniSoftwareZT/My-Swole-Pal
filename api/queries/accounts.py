from pydantic import BaseModel
from typing import Optional, List, Union
from queries.pool import pool


# class DuplicateAccountError(ValueError):
#   pass
class Error(BaseModel):
  message: str

class AccountIn(BaseModel):
  username: str
  email:str
  hashed_password: str


class AccountOut(BaseModel):
  id: str
  email: str
  username: str


class AccountRepository:
  def get_one(self, account_id:int) -> Optional[AccountOut]:
    try:
      with pool.connection() as conn:
        with conn.cursor() as db:
          result = db.execute(
            """
            SELECT id, username, email
            FROM accounts
            WHERE id = %s
            """,
            [account_id]
          )
          record = result.fetchone()
          if record is None:
            return None

          return self.record_to_account_out(record)
    except Exception as e:
      print(e)
      return {"message": "Could not get account"}

  def delete(self, account_id:int) -> bool:
    try:
      with pool.connection() as conn:
        with conn.cursor() as db:
          db.execute(
            """
            DELETE FROM accounts
            WHERE id=%s
            """,
            [account_id]
          )
          return True
    except Exception as e:
      print(e)
      return False

  def update(self, account_id: int, account: AccountIn) -> Union[AccountOut, Error]:
    try:
      with pool.connection() as conn:
        with conn.cursor() as db:
          db.execute(
            """
            UPDATE accounts
            SET username=%s
              , email=%s
              , hashed_password=%s
            WHERE id=%s
            """,
            [
              account.username,
              account.email,
              account.hashed_password,
              account_id
            ]
          )
          return self.account_in_to_out(account_id, account)
    except Exception as e:
      print(e)
      return {"message": "Could not update account"}


  def get_all(self) -> Union[Error, List[AccountOut]]:
    try:
      with pool.connection() as conn:
        with conn.cursor() as db:
          result = db.execute(
            """
            SELECT id, username, email
            FROM accounts
            ORDER BY username
            """
          )

          return [
            self.record_to_account_out(record)
            for record in result
          ]
    except Exception as e:
      print(e)
      return {"message": "Could not get all accounts"}


  def create(self, account: AccountIn) -> AccountOut:
    # connec to the database
    with pool.connection() as conn:
      # get a cursor (something to run sql with)
      with conn.cursor() as db:
        # run our insert statement
        result = db.execute(
          """
          INSERT INTO accounts
            (username, email, hashed_password)
          VALUES
            (%s, %s, %s)
          RETURNING id;
          """,
          [
            account.username,
            account.email,
            account.hashed_password
          ]
        )
        id = result.fetchone()[0]
        # return new data
        return self.account_in_to_out(id, account)

  def account_in_to_out(self, id:int, account: AccountIn):
    old_data = account.dict()
    return AccountOut(id=id, **old_data)

  def record_to_account_out(self, record):
    return AccountOut(
      id=record[0],
      username=record[1],
      email=record[2]
      )


# class AccountQueries(Queries):

#   def get(self,email:str) ->

#   def create(self, info:AccountIn, hashed_password:str) -> AccountOut:
