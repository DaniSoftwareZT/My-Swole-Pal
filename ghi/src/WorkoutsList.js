import React, { useEffect } from "react";
import { useGetWorkoutsQuery, useGetTokenQuery } from "./store/Api";
import WorkoutCard from "./WorkoutCard";
import "./App.css";

function WorkoutsList() {
  const { data } = useGetWorkoutsQuery();
  const { data: tokenData } = useGetTokenQuery();
  const accountId = tokenData && tokenData.account && tokenData.account.id;
  console.log(data);
  console.log(accountId)

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container my-4">
      {
        <div className="workout-grid">
          {data?.map((workout) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
              accountId={accountId}
            />
          ))}
        </div>
      }
    </div>
  );
}

export default WorkoutsList;
