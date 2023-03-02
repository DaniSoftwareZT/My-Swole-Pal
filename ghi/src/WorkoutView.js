import { useGetWorkoutQuery, useGetExercisesQuery, useGetWorkoutExercisesQuery } from "./store/api";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";


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
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{workout.name}</h1>
      {/* Display workout data */}
      <h2>Exercises</h2>
      {exercises.map((exercise) => (
        <div key={exercise.id}>
          <h3>{exercise.name}</h3>
          <h4>{exercise.muscle}</h4>
          {/* Display exercise data */}
        </div>
      ))}
    </div>
  );
}

export default WorkoutView;
