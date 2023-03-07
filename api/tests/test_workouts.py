from fastapi.testclient import TestClient
from main import app
from queries.workouts import WorkoutQueries
from authenticator import authenticator

client = TestClient(app)

class FakeWorkoutQueries:
    def get_all(self, account_id:int):
        return []

def get_fake_account_data():
    return {"id":1, "username":"test", "email":"test@email.com"}

def test_get_workouts():
    # Arrange
    app.dependency_overrides[authenticator.get_current_account_data]= get_fake_account_data
    app.dependency_overrides[WorkoutQueries]=FakeWorkoutQueries


    # Act
    res = client.get("/api/workouts")
    data = res.json()

    # Assert
    assert data==[]
    assert res.status_code==200
