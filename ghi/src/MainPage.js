import { useEffect, useState } from "react";
import Slider from "react-slick";
import "./App.css";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

function MainPage() {

	return (
		<div>
			<h1>
				Don't skip leg day
			</h1>
		</div>
	)
// 	const [models, setModels] = useState([]);

// 	const getModels = async () => {
// 		const response_models = await fetch("http://localhost:8100/api/models/");

// 		if (response_models.ok) {
// 			const data_models = await response_models.json();
// 			setModels(data_models.models);
// 		}
// 	};

// 	const NextArrow = ({ onClick }) => {
// 		return (
// 			<div className="arrow next" onClick={onClick}>
// 				<FaArrowRight />
// 			</div>
// 		);
// 	};

// 	const PrevArrow = ({ onClick }) => {
// 		return (
// 			<div className="arrow prev" onClick={onClick}>
// 				<FaArrowLeft />
// 			</div>
// 		);
// 	};

// 	const [imageIndex, setImageIndex] = useState(0);
// 	const [activeSlide, setActiveSlide] = useState(0);

// 	const settings = {
// 		infinite: true,
// 		lazyLoad: true,
// 		speed: 300,
// 		slidesToShoe: 4,
// 		centerMode: true,
// 		centerPadding: 0,
// 		nextArrow: <NextArrow />,
// 		prevArrow: <PrevArrow />,
// 		beforeChange: (current, next) => setImageIndex(next),
// 	};

// 	useEffect(() => {
// 		getModels();
// 	}, []);

// 	return (
// 		<div className="MainPage">
// 			<div className="px-4 py-5 my-5 text-center">
// 				<h1 className="display-5 fw-bold">MySwolePal</h1>
// 				<div className="col-lg-6 mx-auto">
// 					<p className="lead mb-4">
// 						The premiere solution for your exercise needs
// 					</p>
// 				</div>
// 			</div>

// 			<Slider {...settings}>
// 				{models.map((model, idx) => (
// 					<div
// 						key={model.href}
// 						className={idx === imageIndex ? "slide activeSlide" : "slide"}
// 					>
// 						<img src={model.picture_url} alt="ADD MODELS FOR IMAGES" />
// 					</div>
// 				))}
// 			</Slider>
// 		</div>
// 	);
 }

export default MainPage;
