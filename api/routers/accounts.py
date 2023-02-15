from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator

from pydantic import BaseModel
from typing import Union, List, Optional
from queries.accounts import (
    AccountIn,
    AccountOut,
    AccountQueries,
    DuplicateAccountError,
    Error,
)

class AccountForm(BaseModel):
    username: str
    password: str

class AccountToken(Token):
    account: AccountOut

class HttpError(BaseModel):
    detail: str

router = APIRouter()

@router.get("/api/protected", response_model=bool)
async def get_protected(
  account_data: dict = Depends(authenticator.get_current_account_data),
):
  return True

@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: AccountOut = Depends(authenticator.try_get_current_account_data)
) -> AccountToken | None:
    if account and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }

@router.post("/api/accounts", response_model=AccountToken | HttpError)
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    repo: AccountQueries = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    print("hashed_password", hashed_password)
    try:
        account = repo.create(info, hashed_password)
        print("account", account)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = AccountForm(username=info.email, password=info.password)
    print("form", form)
    token = await authenticator.login(response, request, form, repo)
    #the login here calls the get_account_data in authenticator.py. Magic. which starts the auth process.
    return AccountToken(account=account, **token.dict())

# @router.post("/accounts", response_model = Union[AccountOut, Error])
# def create_account(
#   account: AccountIn,
#   response: Response,
#   repo: AccountQueries = Depends()
# ):
#   if account is None:
#       response.status_code = 400
#   return repo.create(account)


@router.get("/accounts", response_model = Union[List[AccountOut], Error])
def get_all(
  repo: AccountQueries = Depends(),
):
  return repo.get_all()


@router.put("/accounts/{account_id}", response_model = Union[AccountOut, Error])
def update_account(
  account_id: int,
  account: AccountIn,
  repo:AccountQueries = Depends(),
) -> Union[AccountOut, Error]:
  return repo.update(account_id, account)


@router.delete("/accounts/{account_id}", response_model = bool)
def delete_account(
  account_id: int,
  repo:AccountQueries = Depends(),
) -> bool:
  return repo.delete(account_id)


@router.get("/accounts/{account_id}", response_model = Optional[AccountOut])
def get_one_account(
  account_email: str,
  response: Response,
  repo:AccountQueries = Depends(),
) -> AccountOut:
  account = repo.get_one(account_email)
  if account is None:
    response.status_code = 404
  return account
