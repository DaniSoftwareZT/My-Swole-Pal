import {
    useGetWorkoutQuery,
    useGetWorkoutExercisesQuery,
    useDeleteExerciseMutation,
    useDeleteWorkoutMutation,
} from "./store/Api";
import ExerciseModal from "./ExerciseModal";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Spinner, Button, Modal } from "react-bootstrap";
import "./App.css";

function firstToUpper(string) {
    let first = string[0].toUpperCase();
    let new_string = first + string.slice(1);
    return new_string.split("_").join(" ");
}

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
            <div className="d-flex justify-content-center">
                <div style={{ marginRight: "15px" }}>
                    <Button onClick={handleShow}>Add Exercise</Button>
                    {showModal && (
                        <Modal
                            show={showModal}
                            onHide={() => setShowModal(false)}
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>{workout.name}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ExerciseModal></ExerciseModal>
                            </Modal.Body>
                        </Modal>
                    )}
                </div>
                <div>
                    <Button
                        className="btn btn-danger"
                        onClick={handleShowDelete}
                    >
                        Delete Workout
                    </Button>
                    {showDeleteModal && (
                        <Modal
                            show={showDeleteModal}
                            onHide={() => setShowDeleteModal(false)}
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>Are you sure?</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p>
                                    Are you sure you want to delete this
                                    workout?
                                </p>
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
            </div>
            <Container style={{ color: "white" }}>
                <Row className="mb-3">
                    <Col>
                        <h1>{workout.name}</h1>
                        <p>{workout.description}</p>
                    </Col>
                </Row>
                <Row>
                    <h2>Exercises</h2>
                    <ul className="list-group">
                        {exercises.map((exercise) => (
                            <li
                                id="workout-exercise"
                                className="list-group-item"
                                key={exercise.id}
                            >
                                <div className="d-flex justify-content-end">
                                    <button
                                        className="btn btn-danger"
                                        onClick={() =>
                                            exercise.id &&
                                            deleteExercise(
                                                workout.id,
                                                exercise.id
                                            )
                                        }
                                    >
                                        X
                                    </button>
                                </div>
                                <h4>{exercise.name}</h4>
                                <p>
                                    <strong>Type:</strong>{" "}
                                    {firstToUpper(exercise.type)}
                                </p>
                                <p>
                                    <strong>Muscle:</strong>{" "}
                                    {firstToUpper(exercise.muscle)}
                                </p>
                                <p>
                                    <strong>Equipment:</strong>{" "}
                                    {firstToUpper(
                                        exercise.equipment.split("_").join(" ")
                                    )}
                                </p>
                                <p>
                                    <strong>Difficulty:</strong>{" "}
                                    {firstToUpper(exercise.difficulty)}
                                </p>
                                <p>
                                    <strong>Instructions:</strong>
                                </p>
                                <p>{firstToUpper(exercise.instructions)}</p>
                            </li>
                        ))}
                    </ul>
                </Row>
            </Container>
        </>
    );
}

export default WorkoutView;
