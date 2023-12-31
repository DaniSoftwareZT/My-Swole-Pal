from fastapi.testclient import TestClient
from main import app
from queries.workouts import WorkoutQueries
from authenticator import authenticator
from queries.workouts import WorkoutIn, WorkoutOut

client = TestClient(app)


class FakeWorkoutQueries:
    def get_all(self, account_id: int):
        return []

    def create(self, account_id: int, workout: WorkoutIn) -> WorkoutOut:
        workout_dict = workout.dict()
        return WorkoutOut(id=2, account_id=account_id, **workout_dict)

    def delete_workout(self, account_id: int, id: int) -> bool:
        return True

    def update_workout(
        self, account_id: int, id: int, workout: WorkoutIn
    ) -> WorkoutOut:
        workout_dict = workout.dict()
        return WorkoutOut(id=56, account_id=account_id, **workout_dict)


def get_fake_account_data():
    return {"id": 1, "username": "test", "email": "test@email.com"}


def test_get_workouts():
    # Arrange
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = get_fake_account_data
    app.dependency_overrides[WorkoutQueries] = FakeWorkoutQueries

    # Act
    res = client.get("/api/workouts")
    data = res.json()

    # Assert
    assert data == []
    assert res.status_code == 200


# def test_create():
#     # Arrange
#     app.dependency_overrides[
#         authenticator.get_current_account_data
#     ] = get_fake_account_data
#     app.dependency_overrides[WorkoutQueries] = FakeWorkoutQueries
#     workout_dict = {
#         "name": "Test",
#         "image_url": "test.jpg",
#     }

#     account_id=get_fake_account_data()["id"]

#     # Act
#     res = client.post("/api/workouts",
#     json=json.dumps(workout_dict),
#     params={account_id:account_id})
#     # Assert
#     assert res.status_code == 200
#     assert res.json()["id"] == 1


def test_delete():
    # Arrange
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = get_fake_account_data
    app.dependency_overrides[WorkoutQueries] = FakeWorkoutQueries

    # Act
    workout_id = 3
    res = client.delete(f"/api/workouts/{workout_id}")

    # Assert
    assert res.status_code == 200
    assert res.json()


# def test_update_workout():
#     # Arrange
#     app.dependency_overrides[
#         authenticator.get_current_account_data
#     ] = get_fake_account_data
#     app.dependency_overrides[WorkoutQueries] = FakeWorkoutQueries
#     workout_id = 1

#     new_workout_dict = {
#         "name": "Pull",
#         "image_url": "pull.jpg",
#     }
#     # Act
#     res = client.put(
#         f"/api/workouts/{workout_id}",
#         json=json.dumps(new_workout_dict),
#         account_id=id
#     )

#     # Assert
#     assert res.status_code == 200
#     assert res.json() == {
#         "account_id": 1,
#         "name": "Pull",
#         "image_url": "pull.jpg",
#         "id": 56,
# }
