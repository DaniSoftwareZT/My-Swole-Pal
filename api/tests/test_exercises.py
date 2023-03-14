from fastapi.testclient import TestClient
from main import app
from queries.exercises import ExerciseQueries
from authenticator import authenticator

client = TestClient(app)


class FakeExerciseQueries:
    def get_all_exercises(self, account_id: int, workout_id: int):
        return []


def get_fake_account_data():
    return {"id": 1, "username": "test", "email": "test@email.com"}


def test_get_all_exercises():
    # Arrange
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = get_fake_account_data
    app.dependency_overrides[ExerciseQueries] = FakeExerciseQueries

    # Act
    workout_id = 1
    res = client.get(f"/api/workouts/{workout_id}/exercises")
    data = res.json()

    # Assert
    assert data == []
    assert res.status_code == 200
