
# MySwolePal
- Adrian Chen
- Ally Haas Messimer
- Daniel Zambrana
- Edwin Madrigal
- Jessica Palacios

MySwolePal is an efficient workout planner that enables the user to explore exercises based on muscle group, difficulty level, and type. By seamlessly integrating exercises into a workout regimen, users can effortlessly save all their workouts in one convenient location.

## Design
- [API design](docs/api-design.md)
- [Data model](docs/data-model.md)
- [GHI](docs/ghi.md)
- [Integrations](docs/integrations.md)


## Intended market
We are targeting individuals who are passionate about fitness and seek an organized and convenient way to plan and track their workouts. MySwolePal is designed to cater to all levels of experience, from beginners to experts. Whether you are looking to build muscle, improve endurance, or simply stay active, MySwolePal enables you to effortlessly add exercises to your workout regimen and save all your workouts in one easily accessible location. If you are seeking a reliable and efficient way to stay on top of your fitness goals, MySwolePal is the perfect app for you!

## Functionality
- Create an account to access MySwolePal's features
- Log in to your account to view your saved workouts
- View a list of your workouts and click on one to view the exercises included in it
- Delete a workout from your list if no longer needed
- Add new exercises to your workouts to keep your routine fresh and challenging
- Search MySwolePal's library of exercises and filter based on muscle group, difficulty level, and exercise type to find exercises that match your fitness goals
- Add exercises from your search results directly to your workout to customize your routine and make it more effective.
- Delete an exercise from a workout

## Project Initialization
To fully enjoy this application on your local machine, please make sure to follow these steps:
1. Clone the repository down to your local machine
2. CD into the new project directory
3. Run docker volume create pg-admin
4. Run docker volume create swole
5. Run docker compose build
6. Run docker compose up
