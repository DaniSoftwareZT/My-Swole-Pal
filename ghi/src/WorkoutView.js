import { useGetWorkoutQuery } from "./store/api";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function useWorkout(id) {
  const { data: workout, isLoading } = useGetWorkoutQuery(id);

  return {
    workout,
    isLoading,
  };
}

function WorkoutView(props) {
  const { id } = useParams();
  const { data: workout, isLoading } = useGetWorkoutQuery(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{workout.name}</h1>
      {/* Display workout data */}
    </div>
  );
}

export default WorkoutView;
