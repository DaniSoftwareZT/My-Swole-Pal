import { useState } from "react";


function SearchForm(props) {
	const [type, setType] = useState("");
	const [muscle, setMuscle] = useState("");
	const [difficulty, setDifficulty] = useState("");

	return (
		<form>
			<BootstrapInput
				id="type"
				placeholder="Enter type"
				labelText="Enter type"
				value={type}
				onChange={(e) => setEmail(e.target.value)}
				type="text"
			/>
			<BootstrapInput
				id="muscle"
				placeholder="Enter muscle"
				labelText="Enter muscle"
				value={muscle}
				onChange={(e) => setName(e.target.value)}
				type="text"
			/>
			<BootstrapInput
				id="difficulty"
				placeholder="Enter difficulty"
				labelText="Enter difficulty"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				type="password"
			/>
			<button type="submit" className="btn btn-primary">
				Submit
			</button>
		</form>
	);
}

export default SearchForm;
