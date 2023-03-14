from fastapi import (
    Depends,
    APIRouter,
)

from queries.searches import (
    SearchIn,
    SearchQueries,
)

router = APIRouter()


@router.get("/api/exercises", tags=["searches"])
async def get_search(
    name: str | None = None,
    type: str | None = None,
    muscle: str | None = None,
    difficulty: str | None = None,
    repo: SearchQueries = Depends(),
):
    search = SearchIn(
        name=name, type=type, muscle=muscle, difficulty=difficulty
    )
    return repo.search_exercises(search=search)
