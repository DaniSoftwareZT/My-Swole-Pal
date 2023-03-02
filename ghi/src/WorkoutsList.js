import React, { useState, useEffect } from "react";
import WorkoutCard from "./WorkoutCard";
import { useGetWorkoutsQuery, useGetTokenQuery } from "./store/api";

function WorkoutsList() {
	const { data } = useGetWorkoutsQuery();
	const { data: tokenData } = useGetTokenQuery();
	// const [workouts, setWorkouts] = useState([]);
	const accountId = tokenData && tokenData.account && tokenData.account.id;

	// useEffect(() => {
	// 	setWorkouts(data);
	// }, [data]);

	return (
		<div>
			<div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3">
				{console.log(data.workouts)}
				{data.workouts.map((workout) => (
					<div key={workout.id} className="col">
						<WorkoutCard
							workout={workout}
							key={workout.id}
							accountId={accountId}
						/>
					</div>
				))}
			</div>
		</div>
	);
}

export default WorkoutsList;
