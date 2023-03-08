import Deadlift from "./Deadlift";
import Rope from "./Rope";
import Squat from "./Squat";
import Plank from "./Plank";
import ExerciseGIF from "./exercise_search.gif";
import { useNavigate } from "react-router-dom";

function MainPage() {
	const navigate = useNavigate();

	function handleSearch(e){
		e.preventDefault();
		navigate("/exercises")
	}

	return (
		<>
			<Deadlift />
			<span className="split-container">
				<div className="left-side blue">
					<img src={ExerciseGIF} alt="Exercise Search GIF" autoPlay loop />
				</div>
				<div className="right-side gray">
					<div>
						<h3>Search from hundreds of exercises</h3>
						<h5>
							Get instant results for exercises to add to your workout plan
						</h5>
						<button onClick={handleSearch} className="btn search-exercise">Search Now!</button>
					</div>
				</div>
			</span>
			<Deadlift />
			<span className="split-container">
				<div className="left-side gray">
					<div>Here is the left side with an image</div>
				</div>
				<div className="right-side blue">
					<div>Here is the left side with inspirational text</div>
				</div>
			</span>
			<Rope />
			<span className="split-container">
				<div className="left-side blue">
					<div>Here is the left side with an image</div>
				</div>
				<div className="right-side gray">
					<div>Here is the left side with inspirational text</div>
				</div>
			</span>
			<Squat />
			<span className="split-container">
				<div className="left-side gray">
					<div>Here is the left side with an image</div>
				</div>
				<div className="right-side blue">
					<div>Here is the left side with inspirational text</div>
				</div>
			</span>
			<Plank />
		</>
	);
}
export default MainPage;
