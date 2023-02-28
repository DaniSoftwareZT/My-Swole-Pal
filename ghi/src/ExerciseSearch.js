import React, { useState } from 'react';
import ExerciseCard from './ExerciseCard';

function ExerciseSearch() {
    const [exercises, setExercises] = useState([]);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const exerciseData = {
            type: form.type.value,
            muscle: form.muscle.value,
            difficulty: form.difficulty.value,
        };
        const response = await fetch('https://api.ninjas.com/exercises/search', {
            method: 'POST',
            body: JSON.stringify(exerciseData),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        setExercises(data);
    };

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label htmlFor="type">Type</label>
                    <select id="type" name="type">
                        <option value="">Select type</option>
                        <option value="cardio">Cardio</option>
                        <option value="strength">Strength</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="muscle">Muscle</label>
                    <select id="muscle" name="muscle">
                        <option value="">Select muscle</option>
                        <option value="legs">Legs</option>
                        <option value="chest">Chest</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="difficulty">Difficulty</label>
                    <select id="difficulty" name="difficulty">
                        <option value="">Select difficulty</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </select>
                </div>
                <button type="submit">Search</button>
            </form>
            <div>
                {exercises.map((exercise) => (
                    <ExerciseCard key={exercise.id} exercise={exercise} />
                ))}
            </div>
        </div>
    );
}

export default ExerciseSearch;
