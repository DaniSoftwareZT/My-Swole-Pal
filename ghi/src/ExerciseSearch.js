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
			<form onSubmit={handleFormSubmit}>
				<div>
					<label htmlFor="type">Type</label>
					<select id="type" name="type">
						<option value="">Select type</option>
						<option value="cardio">Cardio</option>
						<option value="strength">Strength</option>
						<option value="powerlifting">Powerlifting</option>
					</select>
				</div>
				<div>
					<label htmlFor="muscle">Muscle</label>
					<select id="muscle" name="muscle">
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
				<div>
					<label htmlFor="difficulty">Difficulty</label>
					<select id="difficulty" name="difficulty">
						<option value="">Select difficulty</option>
						<option value="beginner">Beginner</option>
						<option value="intermediate">Intermediate</option>
						<option value="expert">Expert</option>
					</select>
				</div>
				<button type="submit">Search</button>
			</form>
			<div>
				{exercises &&
					exercises.map((exercise) => (
						<ExerciseCard key={exercise.id} exercise={exercise} />
					))}
			</div>
		</div>
	);
}

export default ExerciseSearch;
