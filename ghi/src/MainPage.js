// import Deadlift from "./Deadlift";
// import Rope from "./Rope";
// import Squat from "./Squat";
// import Plank from "./Plank";
// import ExerciseGIF from "./exercise_search.gif";
// import { useNavigate } from "react-router-dom";

// function MainPage() {
// 	const navigate = useNavigate();

// 	function handleSearch(e){
// 		e.preventDefault();
// 		navigate("/exercises")
// 	}

// 	return (
// 		<>
// 			<Deadlift />
// 			<span className="split-container">
// 				<div className="left-side half1">
// 					<img src={ExerciseGIF} alt="Exercise Search GIF" autoPlay loop />
// 				</div>
// 				<div className="right-side half2">
// 					<div>
// 						<h3 className="mt-4" style={{ fontSize: "3rem" }}>Sweat Now</h3>
// 						<h3 style={{ fontSize: "3rem" }}>
// 							Shine Later
// 						</h3>
// 						<h5 className="mt-3">Get swole and stay organized with <strong style={{ fontSize: "2rem" }}>My Swole Pal™</strong></h5>
// 						<div className="mt-4">
// 							<button onClick={handleSearch} className="btn search-exercise">Search Now!</button>
// 						</div>
// 					</div>
// 				</div>
// 			</span>
// 			<Deadlift />
// 			<span className="split-container">
// 				<div className="left-side half2">
// 					<div>Here is the left side with an image</div>
// 				</div>
// 				<div className="right-side half1">
// 					<div>Here is the left side with inspirational text</div>
// 				</div>
// 			</span>
// 			<Rope />
// 			<span className="split-container">
// 				<div className="left-side half1">
// 					<div>Here is the left side with an image</div>
// 				</div>
// 				<div className="right-side half2">
// 					<div>Here is the left side with inspirational text</div>
// 				</div>
// 			</span>
// 			<Squat />
// 			<span className="split-container">
// 				<div className="left-side half2">
// 					<div>Here is the left side with an image</div>
// 				</div>
// 				<div className="right-side half1">
// 					<div>Here is the left side with inspirational text</div>
// 				</div>
// 			</span>
// 			<Plank />
// 		</>
// 	);
// }
// export default MainPage;


import Deadlift from "./Deadlift";
import Rope from "./Rope";
import Squat from "./Squat";
import Plank from "./Plank";
import ExerciseGIF from "./exercise_search.gif";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault();
    navigate("/exercises");
  }

  return (
    <div className="main-container">
      <Deadlift />
      <div className="centered-container">
        <img
          src={ExerciseGIF}
          alt="Exercise Search GIF"
          autoPlay
          loop
          className="exercise-gif"
        />
        <h4 className="slogan">
          Sweat Now, Shine Later
        </h4>
		<h5 className="slogan">
          Get swole and stay organized with <span>My Swole Pal™</span>
        </h5>
        <button onClick={handleSearch} className="search-button">
          Search Exercises
        </button>
      </div>
      <Rope />g
		<span className="split-container">
 			<div className="left-side half2">
				<div>Here is the left side with an image</div>
 			</div>
 			<div className="right-side half1">
				<div>Here is the left side with inspirational text</div>
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
      <Plank />
    </div>
  );
}

export default MainPage;
