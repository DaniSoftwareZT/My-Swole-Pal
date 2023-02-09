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
                "image_url": "",
                "description": "",
                "exercises": [{
                    "name": "",

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
        "image_url": "",
        "description": "",
        "exercises": [{
            "name": "",
        }, "..."]
    }
    ```

* Response: True

* Response shape (JSON):
    ```json
    {
        "name": "",
        "image_url": "",
        "description": "",
        "exercises": [{
            "name": "",
        }, "..."]
    }
    ```


### Planner

* Endpoint path: /planner
* Endpoint method: GET

* Headers:
  * Authorization: Bearer token

* Response: List of workouts for the week

* Response shape (JSON):
    ```json
    {
        "workouts": [
            {
                "date": date object,
                "name": "",
                "image_url": "",
                "description": "",
                "exercises": [{
                    "name": "",

                }]
            }
        ]
    }
    ```


### Planner

* Endpoint path: /planner
* Endpoint method: POST

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
    ```json
    {
        "date": date object,
        "name": "",
        "image_url": "",
        "description": "",
        "exercises": [{
            "name": "",
        }, "..."]
    }
    ```

* Response: Add workout to planner

* Response shape (JSON):
    ```json
    {
        "workouts": [
            {
                "date": date object,
                "name": "",
                "image_url": "",
                "description": "",
                "exercises": [{
                    "name": "",

                }]
            }
        ]
    }
    ```


### Exercise results

* Endpoint path: /exercise/search
* Endpoint method: GET
* Query parameters:
  * q: the exercise(s) to search for

* Headers:
  * Authorization: Bearer token

* Response: List of exercises that meet filter parameters

* Response shape (JSON):
    ```json
    {
        "exercises": [
            {
                "name": "",
                "type": "",
                "muscle": "",
                "equipment": "",
                "difficulty": "",
                "instructions": "",
            }
        ]
    }
    ```


### Workout instance get

* Endpoint path: /workouts/{id}/
* Endpoint method: GET


* Headers:
  * Authorization: Bearer token

* Response: Workout instance

* Response shape (JSON):
    ```json
    {
        "name": "",
        "image_url": "",
        "description": "",
        "exercises": [{
            "name": "",
            "weight": "",
            "sets": "",
            "reps": "",
            "completed": "",
        }, "..."]
    }
    ```


### Workout instance create

* Endpoint path: /workouts/{id}/
* Endpoint method: POST


* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
    ```json
    {
        "name": "",
        "image_url": "",
        "description": "",
        "exercises": [{
            "name": "",
            "weight": "",
            "sets": "",
            "reps": "",
            "completed": "",
        }, "..."],
        "completed": "",
    }
    ```

* Response: Add workout to log

* Response shape (JSON):
    ```json
    {
        "name": "",
        "image_url": "",
        "description": "",
        "exercises": [{
            "name": "",
            "weight": "",
            "sets": "",
            "reps": "",
            "completed": "",
        }, "..."],
        "completed": "",
    }
    ```


### Workout instance delete

* Endpoint path: /workouts/{id}/
* Endpoint method: GET


* Headers:
  * Authorization: Bearer token

* Response: Workout instance

* Response shape (JSON):
    ```json
    {
        "name": "",
        "image_url": "",
        "description": "",
        "exercises": [{
            "name": "",
            "weight": "",
            "sets": "",
            "reps": "",
            "completed": "",
        }, "..."]
    }
    ```


### Workout template get

* Endpoint path: /workouts/templates/{id}/
* Endpoint method: GET


* Headers:
  * Authorization: Bearer token

* Response: Workout template

* Response shape (JSON):
    ```json
    {
        "name": "",
        "image_url": "",
        "description": "",
        "exercises": [{
            "name": ""
        }, "..."]
    }
    ```


### Workout template create

* Endpoint path: /workouts/templates/{id}/
* Endpoint method: POST

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
    ```json
    {
        "name": "",
        "image_url": "",
        "description": "",
        "exercises": [{
            "name": ""
        }, "..."]
    }
    ```
* Response: Add workout template

* Response shape (JSON):
    ```json
    {
        "name": "",
        "image_url": "",
        "description": "",
        "exercises": [{
            "name": ""
        }, "..."]
    }
    ```


### Workout template delete

* Endpoint path: /workouts/templates/{id}/
* Endpoint method: DELETE


* Headers:
  * Authorization: Bearer token

* Response: Workout template

* Response shape (JSON):
    ```json
    {
        "name": "",
        "image_url": "",
        "description": "",
        "exercises": [{
            "name": ""
        }, "..."]
    }
    ```


### Workout log

* Endpoint path: /workouts/log/
* Endpoint method: GET
* Query parameters:
  * completed: true

* Headers:
  * Authorization: Bearer token

* Response: Workout log

* Response shape (JSON):
    ```json
    {
        "workouts": [
            {
                "date": date object,
                "name": "",
                "description": "",
                "exercises": [{
                    "name": "",

                }]
            }
        ]
    }
    ```
