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

* Endpoint path: /exercises
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

* Endpoint path: /workouts
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

* Endpoint path: /workouts
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

* Endpoint path: /exercises/{id}
* Endpoint method: GET
* Query parameters:
  * q: the exercise(s) to search for

* Headers:
  * Authorization: Bearer token

* Response:  Exercises details that meet filter parameters

* Response shape (JSON):
    ```json
    {
        "exercises": [
            {
            "difficulty level": "",
            "muscle group": "",
            "type": "",
            "equipment": "",
            "instructions": "",
            }
        ]
    }
    ```


### Workout instance get

* Endpoint path: /workouts/{id}
* Endpoint method: GET


* Headers:
  * Authorization: Bearer token

* Response: Workout instance

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


### Workout instance create

* Endpoint path: /workouts/{id}/exercises
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

* Response: Add exercise to workout

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


### Workout instance put

* Endpoint path: /workouts/{id}
* Endpoint method: PUT


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

* Response: Change details to workout

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
    }`

### Workout instance delete

* Endpoint path: /workouts/{id}/exercises
* Endpoint method: DELETE


* Headers:
  * Authorization: Bearer token

* Response: Workout instance

* Response shape (JSON):
    ```json
    {
        "name": "",
        "image_url": "", //optional
        "exercises": {
            "difficulty level": "",
            "muscle group": "",
            "type": "",
        },
    }
    ```

* Response: Remove exercise from workout

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


### Workout instance delete

* Endpoint path: /workouts/{id}
* Endpoint method: DELETE


* Headers:
  * Authorization: Bearer token

* Response: Workout instance

* Response shape (JSON):
    ```json
    {
        "name": "",
        "image_url": "", //optional
        "exercises": {
            "difficulty level": "",
            "muscle group": "",
            "type": "",
        },
    }
    ```
