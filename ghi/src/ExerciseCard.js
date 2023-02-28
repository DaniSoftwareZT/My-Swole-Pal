import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function ExerciseCard(props) {
    const { exercise, accountId } = props;
    const [showModal, setShowModal] = useState(false);

    function handleShow() {
        setShowModal(true);
    }

    return (
        <div className="card is-flex is-flex-direction-column">
            <exerciseCardButton exercise={exercise} accountId={accountId} />
            <div className="card-content is-flex-grow-1">
                <div className="media">
                    <div className="media-content">
                        <p className="title is-4">{ exercise.name }</p>
                        <p className="subtitle is-6">
                            <ul>
                                <li>{exercise.type}</li>
                                <li>{exercise.muscle}</li>
                                <li>{exercise.equipment}</li>
                                <li>{exercise.difficulty}</li>
                            </ul>
                        </p>
                        <Button variant="primary" onClick={handleShow}>
                            View Exercise
                        </Button>
                    </div>
                </div>
            </div>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{exercise.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul>
                        <li>Type: {exercise.type}</li>
                        <li>Muscle: {exercise.muscle}</li>
                        <li>Equipment: {exercise.equipment}</li>
                        <li>Difficulty: {exercise.difficulty}</li>
                        <li>Instructions: {exercise.instructions}</li>
                    </ul>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default ExerciseCard;
