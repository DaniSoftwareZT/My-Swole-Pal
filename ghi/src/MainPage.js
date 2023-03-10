import Deadlift from "./Deadlift";
import Rope from "./Rope";
import Squat from "./Squat";
import Plank from "./Plank";
import ExerciseVideo from "./exercise_search.mp4";
import WorkoutVideo from "./workout_updating.mp4";
import { useNavigate } from "react-router-dom";
import SwolePal from "./swole_pal.png";
import Pushup from "./Pushup";

function MainPage() {
	const navigate = useNavigate();

	function handleSearch(e) {
		e.preventDefault();
		navigate("/exercises");
	}

	return (
		<div className="main-container">
			<div className="centered-container">
				<img src={SwolePal} />
				<h4 className="slogan">Sweat Now, Shine Later</h4>
				<h5 className="slogan mb-4">
					Get swole and stay organized with <span>My Swole Pal™</span>
				</h5>
			</div>
			<Deadlift />
			<div className="centered-container-video">
				<h4 className="slogan">Search from hundreds of exercises!</h4>
				<video autoPlay loop className="exercise-search-video">
					<source src={ExerciseVideo} type="video/mp4" />
					Your browser does not support the video tag.
				</video>
				<button onClick={handleSearch} className="search-button">
					Search Exercises
				</button>
			</div>
			<Rope />
			<div className="centered-container-video">
				<video autoPlay loop className="exercise-search-video">
					<source src={WorkoutVideo} type="video/mp4" />
					Your browser does not support the video tag.
				</video>
				<h4 className="slogan">Edit and update your workouts in real time</h4>
			</div>
			<Plank />
			<span className="split-container">
				<div className="left-side half2">
					<div>
						<h1>Hear what our users have to say:</h1>
					</div>
				</div>
				<div className="right-side half1">
					<div>
						<div>
							<h4>
								“I’ve been using MySwolePal for a few weeks now and I’m already
								seeing results. The ability to search for exercises based on
								muscle group and difficulty level has really helped me tailor my
								workouts to my fitness goals. Plus, being able to save all my
								workouts in one place is so convenient. Highly recommend this
								app!“
							</h4>
							<h5>- Sarah P.</h5>
						</div>
						<div>
							<h4>
								“MySwolePal has been a game-changer for me. I used to struggle
								to come up with new exercises to target specific muscle groups,
								but with this app, it’s so easy. I love that I can switch up my
								workouts and keep them fresh. Plus, the interface is
								user-friendly and intuitive. A must-have for anyone serious
								about their fitness!”
							</h4>
							<h5>- Tom K</h5>
						</div>
						<div>
							<h4>
								“I’m not the most tech-savvy person, but MySwolePal is so easy
								to use. I appreciate the different workout types available and
								the ability to customize my own routine. It’s also great that I
								can track my progress and see how far I’ve come. Overall, a
								fantastic workout planner that I would recommend to anyone.”
							</h4>
							<h5>- Jake H.</h5>
						</div>
					</div>
				</div>
			</span>
			<Squat />
			<span className="split-container">
				<div className="left-side half2">
					<div>Here is the left side with an image</div>
				</div>
				<div className="right-side half1">
					<div>Here is the left side with inspirational text</div>
				</div>
			</span>
			<Pushup />
		</div>
	);
}

export default MainPage;
