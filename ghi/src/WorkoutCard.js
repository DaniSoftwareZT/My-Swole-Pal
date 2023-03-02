import { useState } from "react";
import { Modal, Button, Card } from "react-bootstrap";
import "./App.css"; // Import custom CSS

function ExerciseCard(props) {
	const { workout, accountId } = props;
	const [showModal, setShowModal] = useState(false);

	function handleShow() {
		setShowModal(true);
	}

	function firstToUpper(string) {
		let first = string[0].toUpperCase();
		let new_string = first + string.slice(1);
		return new_string;
	}

	return (
		<Card className="my-3 shadow-sm">
			<Card.Img variant="top" src={workout.image} />
			<Card.Body className="text-center flex-grow-1">
				<Card.Title>{workout.name}</Card.Title>
				<Button variant="primary" onClick={handleShow}>
					View Exercise
				</Button>
			</Card.Body>
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
				</Modal.Body>
			</Modal>
		</Card>
	);
}

export default ExerciseCard;
