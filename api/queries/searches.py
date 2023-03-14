from pydantic import BaseModel
import requests
import os


class SearchIn(BaseModel):
    name: str | None = None
    type: str | None = None
    muscle: str | None = None
    difficulty: str | None = None


class SearchOut(SearchIn):
    id: str
    instructions: str


class SearchQueries:
    def search_exercises(self, search: SearchIn):
        url = "https://api.api-ninjas.com/v1/exercises?"
        for key, value in search.dict().items():
            if value is not None:
                url += f"{key}={value}&"
        url = url[:-1]
        result = requests.get(
            url, headers={"X-Api-Key": os.environ["NINJA_KEY"]}
        )
        data = result.json()
        return data
