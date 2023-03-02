import {
  useGetWorkoutQuery,
  useGetExercisesQuery,
  useGetWorkoutExercisesQuery,
} from "./store/api";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Spinner } from "react-bootstrap";

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

  if (isLoading) {
    return (
      <Container className="d-flex justify-content-center align-items-center">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

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

export default WorkoutView;
