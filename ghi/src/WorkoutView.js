import {
  useGetWorkoutQuery,
  useGetExercisesQuery,
  useGetWorkoutExercisesQuery,
  useDeleteExerciseMutation,
} from "./store/Api";
import ExerciseModal from "./ExerciseModal"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams , Link} from "react-router-dom";
import { Container, Row, Col, Spinner, Button, Modal, Card} from "react-bootstrap";

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
  const dispatch = useDispatch();
  const { workout, isLoading, exercises } = useWorkout(id);
  const [deleteExerciseMutation, { isLoading: isDeleteExerciseLoading }] =
    useDeleteExerciseMutation();

  const [showModal, setShowModal] = useState(false);

  function handleShow() {
    setShowModal(true);
  }

  const deleteExercise = (workout_id, exercise_id) => {
    console.log("workout_id:", workout_id);
    console.log("exercise_id:", exercise_id);
    deleteExerciseMutation( {workout_id, exercise_id} );
  };

  if (isLoading || isDeleteExerciseLoading) {
    return (
      <Container className="d-flex justify-content-center align-items-center">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  function firstToUpper(string) {
    let first = string[0].toUpperCase();
    let new_string = first + string.slice(1);
    return new_string;
  }

  return (
    <>
    <div className="mt-3">
      <Button onClick={handleShow}>
        Add Exercise
      </Button>
      {showModal && (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{workout.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ExerciseModal>
            </ExerciseModal>
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
                    exercise.id &&
                    deleteExercise(workout.id, exercise.id)
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
    </Container>
    </>

  );
}

export default WorkoutView;
