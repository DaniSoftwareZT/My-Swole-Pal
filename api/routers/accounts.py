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


@router.get("/api/protected", response_model=bool, tags=["accounts"])
async def get_protected(
  account_data: dict = Depends(authenticator.get_current_account_data),
):
    return True


@router.get("/token", response_model=AccountToken | None, tags=["accounts"])
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


@router.post(
      "/accounts",
      response_model=AccountToken | HttpError,
      tags=["accounts"])
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    repo: AccountQueries = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        account = repo.create(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = AccountForm(username=info.email, password=info.password)
    token = await authenticator.login(response, request, form, repo)
    return AccountToken(account=account, **token.dict())


@router.get(
      "/accounts",
      response_model=Union[List[AccountOut], Error],
      tags=["accounts"])
def get_all(
  repo: AccountQueries = Depends(),
):
    return repo.get_all()


@router.put(
      "/accounts/{account_id}",
      response_model=Union[AccountOut, Error],
      tags=["accounts"])
def update_account(
  account_id: int,
  account: AccountIn,
  repo: AccountQueries = Depends(),
) -> Union[AccountOut, Error]:
    return repo.update(account_id, account)


@router.delete(
        "/accounts/{account_id}",
        response_model=bool,
        tags=["accounts"])
def delete_account(
  account_id: int,
  repo: AccountQueries = Depends(),
) -> bool:
    return repo.delete(account_id)


@router.get(
        "/accounts/{account_id}",
        response_model=Optional[AccountOut],
        tags=["accounts"])
def get_one_account(
  account_email: str,
  response: Response,
  repo: AccountQueries = Depends(),
) -> AccountOut:
    account = repo.get_one(account_email)
    if account is None:
        response.status_code = 404
    return account
