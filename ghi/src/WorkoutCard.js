import { useState } from "react";
import { Modal, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./App.css";
import DefaultImage from "./swole_pal.png"

function WorkoutCard(props) {
	const navigate = useNavigate();
	const { workout, accountId } = props;
	const [showModal, setShowModal] = useState(false);

	function handleShow() {
		setShowModal(true);
	}

	function handleRedirect(id) {
		navigate(`${id}`);
	}

	function firstToUpper(string) {
		let first = string[0].toUpperCase();
		let new_string = first + string.slice(1);
		return new_string;
	}

	return (
		<Card className="my-3 shadow-sm workout-card">
			{workout.image_url ? (
                <Card.Img variant="top" src={workout.image_url} />
            ) : (
                <Card.Img variant="top" src={DefaultImage} />
            )}
			<Card.Body className=" workout-card-body text-center flex-grow-1">
				<Card.Title>{workout.name}</Card.Title>
				{accountId && <button className="btn eBTN4" onClick={handleShow}>View Workout</button>}
			</Card.Body>
			{showModal && (
				<Modal show={showModal} onHide={() => setShowModal(false)}>
					<Modal.Header closeButton>
						<Modal.Title>{workout.name}</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<ul className="list-unstyled">
							<li>
								<strong>Name:</strong> {firstToUpper(workout.name)}
							</li>
						</ul>
						<div className="text-center">
							<button
								className="btn eBTN4"
								onClick={() => handleRedirect(workout.id)}
							>
								Edit Workout
							</button>
						</div>
					</Modal.Body>
				</Modal>
			)}
		</Card>
	);
}

export default WorkoutCard;
