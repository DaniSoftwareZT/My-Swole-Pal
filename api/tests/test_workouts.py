from fastapi.testclient import TestClient
from main import app
from queries.workouts import WorkoutQueries
from authenticator import authenticator
from queries.workouts import WorkoutIn, WorkoutOut
import json

client = TestClient(app)


class FakeWorkoutQueries:
    def get_all(self, account_id: int):
        return []

    def create(self, account_id, workout: WorkoutIn) -> WorkoutOut:
        workout_dict = workout.dict()
        return WorkoutOut(id=2, account_id=account_id, **workout_dict)

    def delete_workout(self, account_id: int, id:int) -> bool:
        return True


def get_fake_account_data():
    return {"id": 1, "username": "test", "email": "test@email.com"}


def test_get_workouts():
    # Arrange
    app.dependency_overrides[authenticator.get_current_account_data] = get_fake_account_data
    app.dependency_overrides[WorkoutQueries] = FakeWorkoutQueries

    # Act
    res = client.get("/api/workouts")
    data = res.json()

    # Assert
    assert data == []
    assert res.status_code == 200


def test_create():
    # Arrange
    app.dependency_overrides[authenticator.get_current_account_data] = get_fake_account_data
    app.dependency_overrides[WorkoutQueries] = FakeWorkoutQueries
    workout_dict = {
        "name": "Test",
        "image_url": "test.jpg",
    }
    # Act
    res = client.post("/api/workouts", json.dumps(workout_dict))

    # Assert
    assert res.status_code == 200
    assert res.json()["id"] == 2

def test_delete():
    app.dependency_overrides[authenticator.get_current_account_data] = get_fake_account_data
    app.dependency_overrides[WorkoutQueries] = FakeWorkoutQueries
    workout_dict = {
        "account_id": 1,
        "name": "Test",
        "image_url": "test.jpg",
    }

    workout_id=3
    res = client.delete(f"/api/workouts/{workout_id}")
    assert res.status_code == 200
    assert res.json() == True