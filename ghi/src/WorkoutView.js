import {
	useGetWorkoutQuery,
	useGetExercisesQuery,
	useGetWorkoutExercisesQuery,
	useDeleteExerciseMutation,
	useDeleteWorkoutMutation,
} from "./store/Api";
import ExerciseModal from "./ExerciseModal";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Spinner, Button, Modal } from "react-bootstrap";

function useWorkout(id) {
	const { data: workout, isLoading } = useGetWorkoutQuery(id);
	const { data: exercises, isLoading: isExercisesLoading } =
		useGetWorkoutExercisesQuery(id);

	return {
		workout,
		isLoading: isLoading || isExercisesLoading,
		exercises,
	};
}

function WorkoutView(props) {
	const { id } = useParams();
	const { workout, isLoading, exercises } = useWorkout(id);
	const [deleteExerciseMutation, { isLoading: isDeleteExerciseLoading }] =
		useDeleteExerciseMutation();
	const [deleteWorkoutMutation, { isLoading: isDeleteWorkoutLoading }] =
		useDeleteWorkoutMutation();
	const [showModal, setShowModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const navigate = useNavigate();

	function handleShow() {
		setShowModal(true);
	}

	function handleShowDelete() {
		setShowDeleteModal(true);
	}

	const deleteExercise = (workout_id, exercise_id) => {
		deleteExerciseMutation({ workout_id, exercise_id });
	};

	const deleteWorkout = () => {
		deleteWorkoutMutation(workout.id);
		navigate(`/`);
	};

	if (isLoading || isDeleteExerciseLoading) {
		return (
			<Container className="d-flex justify-content-center align-items-center">
				<Spinner animation="border" variant="primary" />
			</Container>
		);
	}

	if (isLoading || isDeleteWorkoutLoading) {
		return (
			<Container className="d-flex justify-content-center align-items-center">
				<Spinner animation="border" variant="primary" />
			</Container>
		);
	}

	return (
		<>
			<div className="mt-3">
				<Button onClick={handleShow}>Add Exercise</Button>
				{showModal && (
					<Modal show={showModal} onHide={() => setShowModal(false)}>
						<Modal.Header closeButton>
							<Modal.Title>{workout.name}</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<ExerciseModal></ExerciseModal>
						</Modal.Body>
					</Modal>
				)}
			</div>

			<Container>
				<Row className="mb-3">
					<Col>
						<h1>{workout.name}</h1>
						<p>{workout.description}</p>
					</Col>
				</Row>
				<Row>
					<Col md={8}>
						<h2>Exercises</h2>
						<ul className="list-group">
							{exercises.map((exercise) => (
								<li className="list-group-item" key={exercise.id}>
									<button
										className="btn btn-danger"
										onClick={() =>
											exercise.id && deleteExercise(workout.id, exercise.id)
										}
									>
										Delete
									</button>
									<h4>{exercise.name}</h4>
									<p>
										<strong>Type:</strong> {exercise.type}
									</p>
									<p>
										<strong>Muscle:</strong> {exercise.muscle}
									</p>
									<p>
										<strong>Difficulty:</strong> {exercise.difficulty}
									</p>
									<p>
										<strong>Instructions:</strong>
									</p>
									<p>{exercise.instructions}</p>
								</li>
							))}
						</ul>
					</Col>
				</Row>
				<div className="mt-3">
					<Button onClick={handleShowDelete}>Delete Workout</Button>
					{showDeleteModal && (
						<Modal
							show={showDeleteModal}
							onHide={() => setShowDeleteModal(false)}
						>
							<Modal.Header closeButton>
								<Modal.Title>Are you sure?</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<p>Are you sure you want to delete this workout?</p>
								<button
									className="btn btn-danger"
									onClick={deleteWorkout}
								>
									Delete
								</button>
							</Modal.Body>
						</Modal>
					)}
				</div>
			</Container>
		</>
	);
}

export default WorkoutView;
