import { useState } from "react";
import { Modal, Card, Dropdown } from "react-bootstrap";
import "./App.css";
import {
	useAddExerciseMutation,
	useGetWorkoutsQuery,
	useGetTokenQuery,
} from "./store/Api";
function ExerciseCard(props) {
	const { exercise } = props;
	const { data: workouts = [] } = useGetWorkoutsQuery();
	const [showModal, setShowModal] = useState(false);
	const [selectedWorkout, setSelectedWorkout] = useState(null);
	const [addExercise] = useAddExerciseMutation();
	const { data: token } = useGetTokenQuery();

	function handleShow() {
		setShowModal(true);
	}
	function firstToUpper(string) {
		let first = string[0].toUpperCase();
		let new_string = first + string.slice(1);
		return new_string.split("_").join(" ");
	}

	function allFirstToUpper(string) {
		let wordList = string.split(" ");
		let newWordList = [];
		for (let word of wordList) {
			let newWordFirst = word[0].toUpperCase();
			let newWord = newWordFirst + word.slice(1);

			newWordList.push(newWord);
		}

		return newWordList.join(" ");
	}

	const handleAddExercise = () => {
		if (!selectedWorkout) {
			alert("Please select a workout");
			return;
		}
		const exerciseData = {
			name: exercise.name,
			type: exercise.type,
			muscle: exercise.muscle,
			equipment: exercise.equipment,
			difficulty: exercise.difficulty,
			instructions: exercise.instructions,
		};
		addExercise({
			...exerciseData,
			workout_id: selectedWorkout.id,
		});
		setSelectedWorkout(null);
	};
	const handleWorkoutSelect = (workout) => {
		setSelectedWorkout(workout);
	};
	return (
		<Card className={`my-3 shadow-sm eCard${token ? "" : "-hidden"}`}>
			<Card.Header className="text-center flex-grow-1 mt-3">
				<h4>{allFirstToUpper(exercise.name)}</h4>
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
				<button className="mb-2 btn eBTN3" onClick={handleShow}>
					View Exercise
				</button>
				<Dropdown className="mb-2">
					<Dropdown.Toggle
						className="btn eBTN3"
						id="dropdown-basic"
						hidden={!token}
					>
						{selectedWorkout ? selectedWorkout.name : "Select Workout"}
					</Dropdown.Toggle>
					<Dropdown.Menu>
						{workouts?.map((workout) => (
							<Dropdown.Item
								key={workout.id}
								onClick={() => handleWorkoutSelect(workout)}
							>
								{workout.name}
							</Dropdown.Item>
						))}
					</Dropdown.Menu>
				</Dropdown>
				<button
					className="mb-2 btn eBTN4"
					onClick={handleAddExercise}
					hidden={!token}
				>
					Add Exercise
				</button>
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
