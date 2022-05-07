import { useState } from "react";
import { Carousel } from "react-bootstrap";
import Image from "next/image";
import { GrPrevious, GrNext } from "react-icons/gr";
import { ModalComponent } from "./index";

export function CarouselComponent(props) {
	const [index, setIndex] = useState(0);

	const handleSelect = (selectedIndex, e) => {
		setIndex(selectedIndex);
	};

	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [modalImagePath, setModalImagePath] = useState();

	// console.log("asd");
	return props.imgPath === null ? (
		<Carousel
			activeIndex={index}
			onSelect={handleSelect}
			interval={null}
			fade
			nextIcon={<span>aas{FcNext}</span>}
			prevIcon={FcPrevious}
		>
			<Carousel.Item>
				<img
					className="d-block w-100"
					src="http://via.placeholder.com/640x360"
					alt="First slide"
				/>
			</Carousel.Item>
			<Carousel.Item>
				<img
					className="d-block w-100"
					src="http://via.placeholder.com/640x360"
					alt="Second slide"
				/>
			</Carousel.Item>
			<Carousel.Item>
				<img
					className="d-block w-100"
					src="http://via.placeholder.com/640x360"
					alt="Third slide"
				/>
			</Carousel.Item>
		</Carousel>
	) : (
		<>
			<Carousel
				activeIndex={index}
				onSelect={handleSelect}
				interval={null}
				nextIcon={
					<span style={{ color: "black", fontSize: 30 }}>
						<GrNext />
					</span>
				}
				prevIcon={
					<span style={{ color: "black", fontSize: 30 }}>
						<GrPrevious />
					</span>
				}
				variant="dark"
			>
				{props.images.map((image, i) => (
					<Carousel.Item key={i}>
						<Image
							className="d-block w-100"
							width={350}
							height={350}
							src={props.imgPath + "/" + image}
							alt={props.imgPath + "/" + image}
							onClick={() => {
								setShow(true);
								setModalImagePath(props.imgPath + "/" + image);
							}}
						/>
						<ModalComponent
							show={show}
							handleClose={handleClose}
							image={modalImagePath}
							title={props.title}
							images={props.images}
							imgPath={props.imgPath}
							activeIndex={index}
							handleSelect={handleSelect}
						/>
					</Carousel.Item>
				))}
			</Carousel>
		</>
	);
}
