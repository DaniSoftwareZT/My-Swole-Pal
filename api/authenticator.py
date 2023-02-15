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
        # Use your repo to get the account based on the
        # username (which could be an email)
        return repo.get_one(account_email)

    def get_account_getter(
        self,
        repo: AccountQueries = Depends(),
    ):
        # Return the accounts. That's it.
        return repo

    def get_hashed_password(self, account: AccountOutWithPassword):
        # Return the encrypted password value from your
        # account object
        return account.hashed_password

    def get_account_data_for_cookie(self, account: AccountOut):
        # Return the username and the data for the cookie.
        # You must return TWO values from this method.
        return account.username, AccountOut(**account.dict())


authenticator = SwoleAuthenticator(os.environ["SIGNING_KEY"])
