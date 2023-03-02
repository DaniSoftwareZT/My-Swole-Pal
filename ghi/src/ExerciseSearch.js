import React, { useState, useEffect } from "react";
import ExerciseCard from "./ExerciseCard";
import { useLazyGetExercisesQuery, useGetExercisesQuery } from "./store/api";

function ExerciseSearch() {
	const [getExercises, { data }] = useLazyGetExercisesQuery();
	const [exercises, setExercises] = useState([]);

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		const form = event.target;
		const exerciseData = {
			type: form.type.value,
			muscle: form.muscle.value,
			difficulty: form.difficulty.value,
		};

		getExercises(exerciseData);
		// setExercises(data || []);
	};

	useEffect(() => {
		setExercises(data);
	}, [data]);

	return (
		<div>
			<form onSubmit={handleFormSubmit} className="mt-4">
				<div className="row">
					<div className="col-sm">
						<label htmlFor="type">Type</label>
						<select id="type" name="type" className="form-select mb-3">
							<option value="">Select type</option>
							<option value="cardio">Cardio</option>
							<option value="strength">Strength</option>
							<option value="powerlifting">Powerlifting</option>
						</select>
					</div>
					<div className="col-sm">
						<label htmlFor="muscle">Muscle</label>
						<select id="muscle" name="muscle" className="form-select mb-3">
							<option value="">Select muscle</option>
							<option value="abdominals">Abdominals</option>
							<option value="biceps">Biceps</option>
							<option value="chest">Chest</option>
							<option value="lats">Lats</option>
							<option value="hamstrings">Hamstrings</option>
							<option value="quadriceps">Quadriceps</option>
							<option value="triceps">Triceps</option>
						</select>
					</div>
					<div className="col-sm">
						<label htmlFor="difficulty">Difficulty</label>
						<select
							id="difficulty"
							name="difficulty"
							className="form-select mb-3"
						>
							<option value="">Select difficulty</option>
							<option value="beginner">Beginner</option>
							<option value="intermediate">Intermediate</option>
							<option value="expert">Expert</option>
						</select>
					</div>
				</div>
				<button type="submit" className="btn btn-primary">
					Search
				</button>
			</form>
			<div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3">
				{exercises &&
					exercises.map((exercise) => (
						<div key={exercise.id} className="col">
							<ExerciseCard exercise={exercise} />
						</div>
					))}
			</div>
		</div>
	);
}

export default ExerciseSearch;


