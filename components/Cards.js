import { Card, Button } from "react-bootstrap";
import { CarouselComponent, Context } from "./index";
import { BsChevronCompactDown, BsChevronCompactUp } from "react-icons/bs";
import { useState, useContext } from "react";

export function Cards(props) {
	const [descEnlarge, setDescEnlarge] = useState(false);

	const [pieceNumber, setPieceNumber] = useState(0);

	const { basket, setBasket } = useContext(Context);
	return (
		<Card
			className="text-center d-flex flex-column  align-items-end"
			style={{
				width: "24rem",
				margin: "0.5rem",
				padding: "0.3rem",
				boxShadow:
					"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
			}}
		>
			<CarouselComponent
				imgPath={props.imgPath}
				images={props.images}
				title={props.title}
			/>
			<Card.Title style={{ fontSize: props.title.length > 40 ? 28 : 30 }}>
				{props.title || "title"}
			</Card.Title>
			{props.desc ? (
				props.desc.map((item, i) =>
					descEnlarge || i <= 2 ? (
						<Card.Text className="align-self-stretch">{item}</Card.Text>
					) : (
						<></>
					)
				)
			) : (
				<Card.Text>{"desc"}</Card.Text>
			)}
			{props.desc.length > 3 && (
				<Button
					className="p-1  align-self-stretch"
					variant="outline-primary"
					onClick={() => {
						setDescEnlarge(!descEnlarge);
					}}
				>
					{descEnlarge ? <BsChevronCompactUp /> : <BsChevronCompactDown />}
				</Button>
			)}

			<Card.Text
				className="mt-auto p-1 align-self-stretch"
				style={{ fontSize: 20, fontWeight: "bold", marginTop: 20 }}
			>
				{props.price || "???"} $ / 1{" "}
				{props.title === "Repair Kit for Enders Stoves" ? "set" : "piece"}
			</Card.Text>

			{true ? (
				<>
					<input
						onKeyPress={(event) => {
							if (!/[0-9]/.test(event.key)) {
								event.preventDefault();
							}
						}}
						onChange={(e) => {
							setPieceNumber(parseInt(e.target.value || 0));
							// console.log(e.target.value);
						}}
						placeholder="Write number"
						value={pieceNumber}
						className="align-self-stretch text-center"
					/>
					<Button
						className=" btn-block align-self-stretch"
						onClick={() => {
							// console.log("added " + props.title + " to card");
							basket.find((x) => x.id === props.id) === undefined
								? setBasket([
										...basket,
										{
											id: props.id,
											title: props.title,
											count: pieceNumber,
											price: props.price,
											imgPath: props.imgPath,
										},
								  ])
								: setBasket(
										[...basket].map((item) => {
											if (item.id === props.id) {
												return { ...item, count: item.count + pieceNumber };
											} else {
												return { ...item };
											}
										})
								  );
							setPieceNumber(0);
						}}
						disabled={pieceNumber === 0}
					>
						{"Add to Basket"}
					</Button>
				</>
			) : (
				<></>
			)}
		</Card>
	);
}
