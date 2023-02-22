from pydantic import BaseModel
from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from typing import Union, List, Optional
from authenticator import authenticator
from queries.searches import (
    SearchIn,
    SearchOut,
    SearchQueries,

)

router = APIRouter()

@router.post("/api/exercises", tags=["searches"])
async def get_search(
    search: SearchIn,
    repo: SearchQueries = Depends()
):
    return repo.search_exercises(search=search)
