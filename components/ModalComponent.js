import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import Image from "next/image";
import { Carousel } from "react-bootstrap";
import { GrPrevious, GrNext } from "react-icons/gr";

export function ModalComponent(props) {
	// const [show, setShow] = useState(false);

	// const handleClose = () => setShow(false);
	// const handleShow = () => setShow(true);

	const [index, setIndex] = useState(0);

	const handleSelect = (selectedIndex, e) => {
		setIndex(selectedIndex);
	};
	useEffect(() => {
		setIndex(props.index);
	}, []);

	return (
		<>
			<Modal show={props.show} onHide={props.handleClose} centered size="lg">
				<Modal.Header closeButton className="row d-flex justify-content-center">
					<h1 className="row d-flex justify-content-center">
						{props.title || "Title"}
					</h1>
				</Modal.Header>
				<Carousel
					activeIndex={props.activeIndex}
					onSelect={props.handleSelect}
					interval={null}
					nextIcon={
						<span style={{ color: "black", fontSize: 100 }}>
							<GrNext />
						</span>
					}
					prevIcon={
						<span style={{ color: "black", fontSize: 100 }}>
							<GrPrevious />
						</span>
					}
					variant="dark"
				>
					{props.images.map((image, i) => (
						<Carousel.Item key={i}>
							<Image
								className="d-block w-100"
								width={1000}
								height={1000}
								src={props.imgPath + "/" + image}
								alt={props.imgPath + "/" + image}
							/>
						</Carousel.Item>
					))}
				</Carousel>
				<Button variant="secondary" onClick={props.handleClose}>
					Close
				</Button>
			</Modal>
		</>
	);
}
