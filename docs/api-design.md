### «Human-readable of the endpoint»


### Log in

* Endpoint path: /token
* Endpoint method: POST

* Request shape (form):
  * username: string
  * password: string

* Response: Account information and a token
* Response shape (JSON):
    ```json
    {
      "account": {
        «key»: type»,
      },
      "token": string
    }
    ```


### Log out

* Endpoint path: /token
* Endpoint method: DELETE

* Headers:
  * Authorization: Bearer token

* Response: Always true
* Response shape (JSON):
    ```json
    true
    ```


### Sign up

* Endpoint path: /token
* Endpoint method: POST

* Request shape (form):

  * name: string
  * email: string
  * username: string
  * password: string

* Response: True
* Response shape (JSON):
    ```json
    {
      "account": {
        «key»: type»,
      },
      "token": string
    }
    ```


### Exercises List

* Endpoint path: api/workouts/{workout_id}/exercises
* Endpoint method: GET

* Headers:
  * Authorization: Bearer token

* Response: List of exercises you've created

* Response shape (JSON):
    ```json
    {
        "exercises": [
            {
                "name": "",
                "image_url": "", //optional
                "exercises": [{
                    "difficulty level": "",
                    "muscle group": "",
                    "type": "",

                }]
            }
        ]
    }
    ```

### Workout List

* Endpoint path: /api/workouts
* Endpoint method: GET

* Headers:
  * Authorization: Bearer token

* Response: List of workouts you've created

* Response shape (JSON):
    ```json
    {
        "workouts": [
            {
                "name": "",
                "image_url": "", //optional
                "exercises": [{
                    "difficulty level": "",
                    "muscle group": "",
                    "type": "",

                }]
            }
        ]
    }
    ```


### Workout Create

* Endpoint path: /api/workouts
* Endpoint method: POST

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
    ```json
    {
        "name": "",
        "image_url": "", //optional
        "exercises": {
            "difficulty level": "",
            "muscle group": "",
            "type": "",
        }
    }

* Response: True

* Response shape (JSON):
    ```json
    {
        "name": "",
        "image_url": "", //optional
        "exercises": {
            "difficulty level": "",
            "muscle group": "",
            "type": "",
        }
    }


### Exercise details

* Endpoint path: /api/exercises
* Endpoint method: GET
* Query parameters:
  * q: the exercise(s) to search for

* Headers:
  * Authorization: Bearer token

* Response:  Exercises details that meet filter parameters

* Response shape (JSON):
    ```json
    {
            {
            "name": "",
            "difficulty level": "",
            "muscle group": "",
            "type": "",
            "equipment": "",
            "instructions": "",
            }
    }
    ```


### Workout instance get

* Endpoint path: /api/workouts/{id}
* Endpoint method: GET


* Headers:
  * Authorization: Bearer token

* Response: Workout instance

* Response shape (JSON):
    ```json
    {
        "id": "",
        "name": "",
        "image_url": "", //optional
        "account_id": "",
    }


### Workout instance create

* Endpoint path: /api/workouts/
* Endpoint method: POST


* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
    ```json
    {
        "name": "",
        "image_url": "", //optional
    }

* Response: Add exercise to workout

* Response shape (JSON):
    ```json
    {
        "id": "",
        "name": "",
        "image_url": "", //optional
        "account_id": "",
    }


### Workout instance put

* Endpoint path: /api/workouts/{id}
* Endpoint method: PUT


* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
    ```json
    {
        "name": "",
        "image_url": "", //optional
    }

* Response: Change details to workout

* Response shape (JSON):
    ```json
    {
        "id": "",
        "name": "",
        "image_url": "", //optional
        "account_id": "",
    }`

### Workout instance delete

* Endpoint path: /api/workouts/{id}
* Endpoint method: DELETE


* Headers:
  * Authorization: Bearer token

* Response: Workout instance

* Request shape (JSON):
    ```json
    {
        "id": "",
    }
    ```

* Response: Remove exercise from workout

* Response shape (JSON):
    ```json
    {
        "bool": true,
    }

### Exercise instance delete

* Endpoint path: /api/workouts/{workout_id}/exercises/{exercise_id}
* Endpoint method: DELETE


* Headers:
  * Authorization: Bearer token

* Response: Workout instance

* Request shape (JSON):
    ```json
    {
        "id": "",
    }
    ```

* Response: Remove exercise from workout

* Response shape (JSON):
    ```json
    {
        "bool": true,
    }
