# Data models
### accounts

| name             | type         | unique | optional |
| ---------------- | ------------ | ------ | -------- |
| id               | SERIAL       | yes    | no       |
| username         | VARCHAR(100) | yes    | no       |
| email            | VARCHAR(100) | yes    | no       |
| hashed_password  | VARCHAR(100) | no     | no       |

The `accounts` table contains the data about a specific user.

### workouts

| name         | type         | unique | optional |
| ------------ | ------------ | ------ | -------- |
| id           | SERIAL       | yes    | no       |
| name         | VARCHAR(100) | no     | no       |
| image_url    | VARCHAR(100) | no     | yes      |
| account_id   | INTEGER      | no     | no       |

The `workouts` table contains the data about a specific users workouts. account_id is a primary key to the Accounts table.

### exercises

| name         | type         | unique | optional |
| ------------ | ------------ | ------ | -------- |
| id           | SERIAL       | yes    | no       |
| name         | VARCHAR(100) | no     | no       |
| workout_id   | INTEGER      | no     | no       |
| type         | VARCHAR(100) | no     | no       |
| muscle       | VARCHAR(100) | no     | no       |
| equipment    | VARCHAR(100) | no     | no       |
| difficulty   | VARCHAR(100) | no     | no       |
| instructions | VARCHAR(100) | no     | no       |

The `exercises` table contains the data about a specific exercises. workout_id is a primary key to the Workouts table.
