import { Line } from "react-chartjs-2";
import React, { useState } from "react";

import {
	useGetProgressRecordsQuery,
	useCreateProgressRecordMutation,
	useGetTokenQuery,
} from "./store/Api";
import { Container, Col, Row, Modal, Form } from "react-bootstrap";
import {
	Chart as ChartJS,
	LineElement,
	CategoryScale, // x axis
	LinearScale, // y axis
	TimeScale,
	PointElement,
	Legend,
	Tooltip,
} from "chart.js";

ChartJS.register(
	LineElement,
	CategoryScale, // x axis
	LinearScale, // y axis
	TimeScale,
	PointElement,
	Legend,
	Tooltip
);

function Progress() {
	const { data: tokenData } = useGetTokenQuery();
	const [weight, setWeight] = useState("");
	const [update_date, setUpdateDate] = useState("");
	const [notes, setNotes] = useState("");
	const [error, setError] = useState("");
	const account_id = tokenData && tokenData.account && tokenData.account.id;
	const [createProgressRecord, result] = useCreateProgressRecordMutation();
	const [showModal, setShowModal] = useState(false);
	const { data: progress } = useGetProgressRecordsQuery();

	if (!progress) {
		return (
			<div className="centered-container">
				<h1 className="loading-message">Loading Progress</h1>
			</div>
		);
	}

	function handleShow() {
		setShowModal(true);
	}

	function handleCreateProgressRecord(e) {
		e.preventDefault();
		createProgressRecord({
			weight: weight,
			update_date: update_date,
			notes: notes,
		});
	}

	let progressList = [];
	let updateDates = [];

	console.log(updateDates);

	for (let item of progress) {
		progressList.push(item["weight"]);
		updateDates.push(item["update_date"]);
	}

	let min_weight = 80;
	if (progressList.length >= 0) {
		min_weight = Math.min(...progressList);
	}

	let max_weight = 180;
	if (progressList.length >= 0) {
		max_weight = Math.max(...progressList);
	}

	if (result.isSuccess) {
		console.log("success");
	} else if (result.isError) {
		setError(result.error);
	}

	console.log(updateDates)

	const data = {
		labels: [...updateDates],
		datasets: [
			{
				label: "Weight Progress",
				data: progressList,
				backgroundColor: "#e32652",
				borderColor: "#e32652",
				pointBorderColor: "#e32652",
				tension: 0.4,
			},
		],
	};

	const options = {
		plugins: {
			legend: true,
		},
		scales: {
			y: {
				min: min_weight - 10,
				max: max_weight + 10,
			},
		},
	};

	return (
		<div>
			<div className="centered-container">
				<h1 className="chart-title">Your Swole Progression</h1>
				<Line className="chart mt-4" data={data} options={options}></Line>
			</div>
			<Container className="d-flex justify-content-center my-4">
				<div className="mb-4">
					<button onClick={handleShow} className="btn eBTN4">
						Add Update
					</button>
				</div>
				{showModal && (
					<Modal show={showModal} onHide={() => setShowModal(false)}>
						<Modal.Header closeButton>
							<Modal.Title>Add Progress Update</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<Form>
								<Form.Group controlId="weight">
									<Form.Label>Weight Update</Form.Label>
									<Form.Control
										type="number"
										placeholder="Enter weight update"
										value={weight}
										onChange={(e) => setWeight(e.target.value)}
									/>
								</Form.Group>
								<Form.Group className="mt-2" controlId="update_date">
									<Form.Label>Update Date</Form.Label>
									<Form.Control
										type="date"
										placeholder="Enter date"
										value={update_date}
										onChange={(e) => setUpdateDate(e.target.value)}
									/>
								</Form.Group>
								<Form.Group className="mt-2" controlId="notes">
									<Form.Label>Notes</Form.Label>
									<Form.Control
										type="text"
										placeholder="Any notes"
										value={notes}
										onChange={(e) => setNotes(e.target.value)}
									/>
								</Form.Group>
							</Form>
						</Modal.Body>
						<Modal.Footer>
							<button className="btn eBTN3" onClick={() => setShowModal(false)}>
								Cancel
							</button>
							<button
								className="btn eBTN3"
								onClick={handleCreateProgressRecord}
							>
								Add Progress Update
							</button>
						</Modal.Footer>
					</Modal>
				)}
			</Container>
		</div>
	);
}

export default Progress;
