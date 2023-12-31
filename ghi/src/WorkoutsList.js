import React, { useState } from "react";
import { Container, Col, Row, Modal, Form } from "react-bootstrap";
import {
	useGetWorkoutsQuery,
	useGetTokenQuery,
	useCreateWorkoutMutation,
} from "./store/Api";
import { useNavigate } from "react-router-dom";
import WorkoutCard from "./WorkoutCard";
import "./App.css";

function WorkoutsList() {
	const navigate = useNavigate();
	const { data } = useGetWorkoutsQuery();
	const { data: tokenData } = useGetTokenQuery();
	const [name, setName] = useState("");
	const [image_url, setPictureUrl] = useState("");
	const [error, setError] = useState("");
	const account_id = tokenData && tokenData.account && tokenData.account.id;
	const [createWorkout, result] = useCreateWorkoutMutation();
	const [showModal, setShowModal] = useState(false);

	if (!data) {
		return <div>Loading...</div>;
	}

	function handleShow() {
		setShowModal(true);
	}

	function handleCreateWorkout(e) {
		e.preventDefault();
		createWorkout({ name: name, image_url: image_url });
	}

	if (result.isSuccess) {
		navigate(`${result.data.id}`);
	} else if (result.isError) {
		setError(error);
	}

	return (
		<>
			<Container className="d-flex justify-content-center my-4">
				<div className="mb-4">
					<button
						onClick={handleShow}
						className="rounded-pill create-workout-btn"
					>
						Create Workout
					</button>
				</div>
				{showModal && (
					<Modal show={showModal} onHide={() => setShowModal(false)}>
						<Modal.Header closeButton>
							<Modal.Title>Create Workout</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<Form>
								<Form.Group controlId="name">
									<Form.Label>Workout Name</Form.Label>
									<Form.Control
										type="text"
										placeholder="Enter workout name"
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
								</Form.Group>
								<Form.Group className="mt-2" controlId="pictureUrl">
									<Form.Label>Picture URL</Form.Label>
									<Form.Control
										type="text"
										placeholder="Enter picture URL"
										value={image_url}
										onChange={(e) => setPictureUrl(e.target.value)}
									/>
								</Form.Group>
							</Form>
						</Modal.Body>
						<Modal.Footer>
							<button className="btn eBTN3" onClick={() => setShowModal(false)}>
								Cancel
							</button>
							<button className="btn eBTN3" onClick={handleCreateWorkout}>
								Create Workout
							</button>
						</Modal.Footer>
					</Modal>
				)}
			</Container>

			<Container className="my-2">
				{data?.length ? (
					<div className="workout-row row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3">
						{data.map((workout) => (
							<div className="col workout-card" key={workout.id}>
								<WorkoutCard workout={workout} accountId={account_id} />
							</div>
						))}
					</div>
				) : (
					<Row className="justify-content-center">
						<Col xs={10} md={6} className="text-center py-3 no-workout">
							<h4 className="mb-0" style={{ fontSize: "1.5rem" }}>
								No existing workouts
							</h4>
						</Col>
					</Row>
				)}
			</Container>
		</>
	);
}

export default WorkoutsList;
