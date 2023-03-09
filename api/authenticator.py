# authenticator.py
import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from queries.accounts import AccountQueries, AccountOut, AccountOutWithPassword


class SwoleAuthenticator(Authenticator):
    async def get_account_data(
        self,
        account_email: str,
        repo: AccountQueries,
    ):
        return repo.get_one(account_email)

    def get_account_getter(
        self,
        repo: AccountQueries = Depends(),
    ):
        return repo

    def get_hashed_password(self, account: AccountOutWithPassword):
        return account.hashed_password

    def get_account_data_for_cookie(self, account: AccountOut):
        return account.username, AccountOut(**account.dict())


authenticator = SwoleAuthenticator(os.environ["SIGNING_KEY"])
