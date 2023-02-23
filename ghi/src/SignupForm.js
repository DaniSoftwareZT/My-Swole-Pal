import { useState } from "react";

function SignupForm() {
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
	});

	const handleSubmit = async (event) => {
		event.preventDefault();

		const signupUrl = `${process.env.REACT_APP_API_API_HOST}/accounts`;

		const fetchConfig = {
			method: "post",
			body: JSON.stringify(formData),
			headers: {
				"Content-Type": "application/json",
			},
		};

		const response = await fetch(signupUrl, fetchConfig);
		if (response.ok) {
			setFormData({
				username: "",
				email: "",
				password: "",
			});
			// setTimeout(navigate("/"), 100)
		}
	};

	const handleFormChange = (event) => {
		const inputName = event.target.name;
		const value = event.target.value;

		setFormData({
			...formData,
			[inputName]: value,
		});
	};

	return (
		<div className="row">
			<div className="offset-3 col-6">
				<div className="shadow p-4 mt-4">
					<h1>Sign Up</h1>
					<form onSubmit={handleSubmit} id="create-location-form">
						<div className="form-floating mb-3">
							<input
								value={formData.username}
								placeholder="username"
								onChange={handleFormChange}
								required
								type="text"
								name="username"
								id="username"
								className="form-control"
							/>
							<label htmlFor="username">userName</label>
						</div>
						<div className="form-floating mb-3">
							<input
								value={formData.email}
								placeholder="Email"
								onChange={handleFormChange}
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
								value={formData.password}
								placeholder="Password"
								onChange={handleFormChange}
								required
								type="password"
								name="password"
								id="password"
								className="form-control"
							/>
							<label htmlFor="password">Password</label>
						</div>
						<button className="btn btn-primary">GET SWOLE!</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default SignupForm;
