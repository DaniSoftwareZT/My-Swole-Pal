import {
  useGetWorkoutQuery,
  useGetExercisesQuery,
  useGetWorkoutExercisesQuery,
  useAddExerciseMutation,
} from "./store/Api";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import ExerciseSearch from "./ExerciseSearch.js";

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

function AddExercise(props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { workout, isLoading, exercises } = useWorkout(id);
  const [addExerciseMutation, { isLoading: isAddExerciseLoading }] =
    useAddExerciseMutation();


  return (
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
  );
}

export default AddExercise;
