import { NavLink } from "react-router-dom";
import { useGetTokenQuery, useLogOutMutation } from "./store/Api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showModal, LOG_IN_MODAL, SIGN_UP_MODAL } from "./store/accountSlice";
import LoginFormModal from "./LoginFormModal";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { useEffect } from "react";

function LoginButton(props) {
	const dispatch = useDispatch();
	const classNames = `btn button1 m-1 ${props.show ? "" : "is-hidden"}`;
	let navigate = useNavigate();
	const SignupRoute = () => {
		let path = "/signup/new";
		navigate(path);
	};
	const LoginRoute = () => {
		let path = "/login/new";
		navigate(path);
	};

	return (
		<div>
			<button onClick={SignupRoute} className={classNames}>
				<strong>Sign up</strong>
			</button>

			<button onClick={LoginRoute} className={classNames}>
				<strong>Log in</strong>
			</button>
		</div>
	);
}

function LogoutButton() {
	const navigate = useNavigate();
	const [logOut, { data }] = useLogOutMutation();

	useEffect(() => {
		if (data) {
			navigate("/");
		}
	}, [data, navigate]);

	return (
		<div className="buttons">
			<button onClick={logOut} className="btn button1 mr-1">
				Log out
			</button>
		</div>
	);
}

function Nav() {
	const { data: token, isLoading: tokenLoading } = useGetTokenQuery();

	return (
		<>
			<nav className="navbar navbar-hide-on-scroll navbar-expand-lg navbar-dark gradient">
				<div className="container-fluid">
					<NavLink className="navbar-brand nav-hover" to="/">
						MySwolePal
					</NavLink>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<NavLink
									className="nav-link active nav-hover"
									aria-current="page"
									to="/"
								>
									Home
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link nav-hover" to="/exercises">
									Exercises
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link nav-hover" to="/workouts">
									Workouts
								</NavLink>
							</li>
						</ul>
					</div>
					<div id="navbarBasicExample" className="navbar-menu">
						<div className="navbar-end">
							<div className="navbar-item">
								{tokenLoading ? (
									<LoginButton show={false} />
								) : token ? (
									<LogoutButton />
								) : (
									<LoginButton show={true} />
								)}
							</div>
						</div>
					</div>
				</div>
			</nav>
		</>
	);
}

export default Nav;
