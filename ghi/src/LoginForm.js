function LoginForm(props) {
	return (
		<div className="form-group">
			<label htmlFor="exampleInputEmail1">Email address</label>
			<input
				type="email"
				className="form-control"
				id="email"
				aria-describedby="emailHelp"
				placeholder="Enter email"
			/>
			<small id="email" className="form-text text-muted">
				We'll never share your email with anyone else.
			</small>
		</div>
	);
}

export default LoginForm;
