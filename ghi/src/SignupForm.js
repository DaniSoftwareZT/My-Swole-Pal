import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignUpMutation } from "./store/Api.js";

function SignupForm() {
	const navigate = useNavigate();
	const [username, setUserName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [signUp] = useSignUpMutation();

	function handleSubmit(e) {
		e.preventDefault();
		signUp({ username, email, password });
		navigate("/");
	}

	return (
		<div className="row SignupForm">
			<div className="offset-3 col-6">
				<div className="shadow p-4 mt-4">
					<h1>Sign Up</h1>
					<form onSubmit={handleSubmit} id="create-location-form">
						<div className="form-floating mb-3">
							<input
								value={username}
								placeholder="username"
								onChange={(e) => setUserName(e.target.value)}
								required
								type="text"
								name="username"
								id="username"
								className="form-control"
							/>
							<label htmlFor="username">Username</label>
						</div>
						<div className="form-floating mb-3">
							<input
								value={email}
								placeholder="Email"
								onChange={(e) => setEmail(e.target.value)}
								required
								type="email"
								name="email"
								id="email"
								className="form-control"
							/>
							<label htmlFor="email">Email</label>
						</div>
						<div className="form-floating mb-3">
							<input
								value={password}
								placeholder="Password"
								onChange={(e) => setPassword(e.target.value)}
								required
								type="password"
								name="password"
								id="password"
								className="form-control"
							/>
							<label htmlFor="password">Password</label>
						</div>
						<button className="btn eBTN3 d-flex justify-content-center">
							GET SWOLE!!!
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default SignupForm;
