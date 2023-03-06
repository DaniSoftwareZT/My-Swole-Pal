import { useState } from "react";
import { Modal, Button, Card } from "react-bootstrap";
import "./App.css"; // Import custom CSS
import { useAddExerciseMutation } from "./store/Api";

function ExerciseCard(props) {
	const { exercise, accountId } = props;
	const [showModal, setShowModal] = useState(false);
	const [ addExercise, { data } ] = useAddExerciseMutation();

	function handleShow() {
		setShowModal(true);
	}

    function firstToUpper(string){
        let first = string[0].toUpperCase()
        let new_string = first+ string.slice(1)
        return new_string.split("_").join(" ")
    }


	const handleAddExercise = () => {
    const exerciseData = {
	  workout_id: workout.id,
      name: exercise.name,
      type: exercise.type,
      muscle: exercise.muscle,
      equipment: exercise.equipment,
      difficulty: exercise.difficulty,
      instructions: exercise.instructions,
    };

    addExercise({
      workout_id,
      ...exerciseData,
    });
  };


	return (
		<Card className="my-3 shadow-sm">
			<Card.Header className="text-center flex-grow-1">
				<h4>{exercise.name}</h4>
			</Card.Header>
			<Card.Body className="text-center flex-grow-1">
				<ul className="list-unstyled">
					<li>
						<strong>Type:</strong> {firstToUpper(exercise.type)}
					</li>
					<li>
						<strong>Muscle:</strong> {firstToUpper(exercise.muscle)}
					</li>
					<li>
						<strong>Equipment:</strong> {firstToUpper(exercise.equipment)}
					</li>
					<li>
						<strong>Difficulty:</strong> {firstToUpper(exercise.difficulty)}
					</li>
				</ul>
				<Button className="mb-2 button1" onClick={handleShow}>
					View Exercise
				</Button>
				<Button className="mb-2 button1" onClick={() =>
                    handleAddExercise(exercise.name, workout.id, exercise.type, exercise.muscle,
					exercise.equipment, exercise.difficulty, exercise.instructions)}>
					Add Exercises
				</Button>

			</Card.Body>
			<Modal show={showModal} onHide={() => setShowModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>{exercise.name}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<ul className="list-unstyled">
						<li>
							<strong>Type:</strong> {firstToUpper(exercise.type)}
						</li>
						<li>
							<strong>Muscle:</strong> {firstToUpper(exercise.muscle)}
						</li>
						<li>
							<strong>Equipment:</strong>{" "}
							{firstToUpper(exercise.equipment.split("_").join(" "))}
						</li>
						<li>
							<strong>Difficulty:</strong> {firstToUpper(exercise.difficulty)}
						</li>
						<li>
							<strong>Instructions:</strong>{" "}
							{firstToUpper(exercise.instructions)}
						</li>
					</ul>
				</Modal.Body>
			</Modal>
		</Card>
	);
}

export default ExerciseCard;

// import { useState } from "react";
// import { Modal, Button } from "react-bootstrap";

// function ExerciseCard(props) {
//     const { exercise, accountId } = props;
//     const [showModal, setShowModal] = useState(false);

//     function handleShow() {
//         setShowModal(true);
//     }

//     return (
// 			<div className="card is-flex is-flex-direction-column">
// 				<exerciseCardButton exercise={exercise} accountId={accountId} />
// 				<div className="card-content is-flex-grow-1">
// 					<div className="media">
// 						<div className="media-content">
// 							<p className="title is-4 text-center">
// 								<strong>{exercise.name}</strong>
// 							</p>
// 							<p className="subtitle is-6 text-center">
// 								<ul>
// 									<li>{exercise.type}</li>
// 									<li>{exercise.muscle}</li>
// 									<li>{exercise.equipment}</li>
// 									<li>{exercise.difficulty}</li>
// 								</ul>
// 							</p>
// 							<Button variant="primary" onClick={handleShow}>
// 								View Exercise
// 							</Button>
// 						</div>
// 					</div>
// 				</div>
// 				<Modal show={showModal} onHide={() => setShowModal(false)}>
// 					<Modal.Header closeButton>
// 						<Modal.Title>{exercise.name}</Modal.Title>
// 					</Modal.Header>
// 					<Modal.Body>
// 						<ul>
// 							<li>Type: {exercise.type}</li>
// 							<li>Muscle: {exercise.muscle}</li>
// 							<li>Equipment: {exercise.equipment}</li>
// 							<li>Difficulty: {exercise.difficulty}</li>
// 							<li>Instructions: {exercise.instructions}</li>
// 						</ul>
// 					</Modal.Body>
// 				</Modal>
// 			</div>
// 		);
// }

// export default ExerciseCard;
