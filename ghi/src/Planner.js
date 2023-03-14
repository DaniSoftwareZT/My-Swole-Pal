import React from "react"


function DateCard({ date }) {



	return (
		<div className="date-card">
			<div className="card-body">
				<h5 className="card-title">{date.toLocaleString("default",{weekday:"long"})}</h5>
				<h6 className="card-subtitle mb-2 text-muted">{date.toLocaleDateString()}</h6>
				<p className="card-text">
                    <div>
                        <button className="btn eBTN3">
                            Add Workout
                        </button>
                    </div>
				</p>
			</div>
		</div>
	);
}

function WeekCards() {
	const today = new Date();
	const week = [...Array(7)].map((_, i) => {
		const date = new Date(today);
		date.setDate(today.getDate() + i);
		return date;
	});

	return (
		<div className="container">
			<div className="row">
				{week.map((date) => (
					<div className="col-sm">
						<DateCard key={date.getTime()} date={date} />
					</div>
				))}
			</div>
		</div>
	);
}

function Planner(){
	return (
		<div className="Planner">
			<WeekCards />
		</div>
	);
}


export default Planner
