import React, { useContext } from "react";
import { MdOutlineAdd } from "react-icons/md";
import { HiOutlineMinusSm } from "react-icons/hi";
import { TiDelete } from "react-icons/ti";
import { Button, Row, Col } from "react-bootstrap";
import Image from "next/image";
import { Context } from "./index";

export function BasketItem(props) {
	const { basket, setBasket, setShowBasket } = useContext(Context);
	return (
		<>
			<Row>
				<Col className="d-flex justify-content-center">
					<Image
						className="d-block w-100 "
						width={100}
						height={100}
						src={props.imgPath + "/1.jpeg"}
						alt={props.title}
						onClick={() => {
							setShow(true);
							setModalImagePath(props.imgPath + "/" + image);
						}}
					/>
				</Col>
				<Col xs={7} className=" justify-content-center">
					<div
						style={{
							fontWeight: "bold",
							marginLeft: "1rem",
							marginRight: "1rem",
						}}
						className="text-center align-self-center"
					>
						{props.title || "title"}
					</div>
					<Row className="d-flex justify-content-center">
						<Col>
							<Button
								variant="outline-primary"
								onClick={() => {
									if (props.count === 1) {
										if (basket.length === 1) {
											setShowBasket(false);
										}
										setBasket(basket.filter((item) => item.id !== props.id));
									} else {
										setBasket(
											[...basket].map((item) => {
												if (item.id === props.id) {
													return { ...item, count: item.count - 1 };
												} else {
													return { ...item };
												}
											})
										);
									}
								}}
							>
								<HiOutlineMinusSm />
							</Button>
						</Col>
						<Col className="text-center align-self-center">
							{props.count || 0}
						</Col>
						<Col>
							<Button
								variant="outline-primary"
								onClick={() =>
									setBasket(
										[...basket].map((item) => {
											if (item.id === props.id) {
												return { ...item, count: item.count + 1 };
											} else {
												return { ...item };
											}
										})
									)
								}
							>
								<MdOutlineAdd />
							</Button>
						</Col>
					</Row>
				</Col>
				<Col className="d-flex flex-column justify-content-between">
					<div className="text-center align-self-center ">Total</div>
					<div className="text-center align-self-center ">
						{Math.round(props.count * props.price * 10) / 10} $
					</div>
					<Button
						variant="outline-danger d-row d-flex justify-content-center "
						style={{}}
						className="align-self-stretch"
						onClick={() => {
							if (basket.length === 1) {
								setShowBasket(false);
							}
							setBasket(basket.filter((item) => item.id !== props.id));
						}}
					>
						<TiDelete className="align-self-center" />
					</Button>
				</Col>
			</Row>
			<br />
		</>
	);
}
