from fastapi import (
    Depends,
    Response,
    APIRouter,
)
from typing import Optional
from authenticator import authenticator
from queries.progress import (
    ProgressIn,
    ProgressOut,
    ProgressQueries,
)

router = APIRouter()

@router.post("/api/progress", tags=["Progress"])
async def create_progress_record(
    progress_in: ProgressIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: ProgressQueries = Depends()
):
    return repo.create_progress_record(progress=progress_in, account_id=account_data["id"])

@router.get("/api/progress", tags=["Progress"])
async def get_all_progress(
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: ProgressQueries = Depends()
):
    return repo.get_all_progress(account_id=account_data['id'])


@router.get(
    "/api/progress/{id}",
    response_model=Optional[ProgressOut],
    tags=["Progress"])
async def get_one_progress_record(
    id: int,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: ProgressQueries = Depends()
) -> ProgressOut:
    progress = repo.get_one_progress_record(account_id=account_data['id'], id=id)
    if progress is None:
        response.status_code = 404
    return progress


@router.put(
    "/api/progress/{id}",
    response_model=Optional[ProgressOut],
    tags=["Progress"])
def update_progress_record(
    id: int,
    progress: ProgressIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: ProgressQueries = Depends(),
) -> ProgressOut:
    return repo.update_progress_record(
        account_id=account_data['id'],
        id=id,
        progress=progress)


@router.delete(
        "/api/progress/{id}",
        response_model=bool,
        tags=["Progress"])
def delete_progress(
    id: int,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: ProgressQueries = Depends(),
) -> bool:
    return repo.delete_progress_record(account_id=account_data['id'], id=id)
