import React, { useState, useContext } from "react";
import { Offcanvas, Button, DropdownButton, Dropdown } from "react-bootstrap";
import { BsCart4 } from "react-icons/bs";
import { Context, BasketItem } from "./index";

export function Basket(props) {
	const {
		showBasket,
		setShowBasket,
		basket,
		setBasket,
		whatsappmessage,
		setWhatsappmessage,
		basketRegionPrice,
		setbasketRegionPrice,
	} = useContext(Context);

	const [regionTitle, setRegionTitle] = useState("Select Region");
	const [regionPrice, setRegionPrice] = useState(null);

	// console.log(basket);
	return (
		<>
			{basket.length !== 0 && (
				<Button
					variant="primary btn-circle row d-flex justify-content-center"
					onClick={() => {
						setShowBasket(true);
					}}
					className="btn-circle "
					style={{
						position: "fixed",
						bottom: "1rem",
						right: "1rem",
						width: "5rem",
						height: "5rem",
						padding: "0rem 0rem 5rem",
						borderRadius: "15rem",
						fontSize: "5rem",
					}}
				>
					<BsCart4 />
				</Button>
			)}
			<Offcanvas
				show={showBasket}
				onHide={() => setShowBasket(false)}
				placement="end"
				scroll
				backdrop
			>
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>My Basket</Offcanvas.Title>
					<Button
						variant="outline-danger"
						className="text-center align-self-center"
						onClick={() => {
							setBasket([]);
							setShowBasket(false);
						}}
					>
						Clear Basket
					</Button>
				</Offcanvas.Header>
				<Offcanvas.Body className="d-flex flex-column  align-items-end">
					{basket.map((item, i) => (
						<BasketItem
							className="p2"
							key={i}
							id={item.id}
							imgPath={item.imgPath}
							price={item.price}
							count={item.count}
							title={item.title}
						/>
					))}
					<Dropdown>
						<Dropdown.Toggle
							className="align-self-stretch"
							variant="outline-primary"
							id="dropdown-basic"
						>
							{regionTitle}
						</Dropdown.Toggle>
						<Dropdown.Menu>
							<Dropdown.Item
								onClick={() => {
									setRegionTitle("Europe (including UK) 6.5$");
									setRegionPrice(6.5);
								}}
							>
								Europe (including UK) 6.5$
							</Dropdown.Item>
							<Dropdown.Item
								onClick={() => {
									setRegionTitle("Rest of the world 8.5$");
									setRegionPrice(8.5);
								}}
							>
								Rest of the world 8.5$
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
					<div className=" align-self-stretch p-2 d-flex flex-column">
						<h4 className="align-self-stretch">
							Total:{" "}
							{basket
								.reduce(
									(total, currentItem) =>
										(total = total + currentItem.price * currentItem.count),
									0
								)
								.toFixed(1)}{" "}
							$ {regionPrice !== null && "+ " + regionPrice + " $ (package) "}
						</h4>
						<h4>
							={" "}
							{parseFloat(
								parseFloat(
									basket
										.reduce(
											(total, currentItem) =>
												(total = total + currentItem.price * currentItem.count),
											0
										)
										.toFixed(1)
								) + regionPrice
							).toFixed(1)}
							{" $"}
						</h4>
						<Button
							className="btn btn-primary align-self-stretch"
							onClick={() => {
								let msg =
									"Hello Sefa, I would like to buy these items from you: ";
								for (let i = 0; i < basket.length; i++) {
									const item = basket[i];
									msg +=
										item.count +
										"x " +
										item.title +
										(i !== basket.length - 1 ? ", " : ". ");
								}
								msg +=
									"My location is " +
									(regionTitle.startsWith("E")
										? "Europe"
										: "Rest of the world");
								window.open("http://wa.me/905322256457/?text=" + msg);

								setWhatsappmessage(msg);
								// console.log(msg);
							}}
							// target="_blank"
							// href={"http://wa.me/905322256457/?text=" + whatsappmessage}
							disabled={regionPrice === null || basket.count === 0}
						>
							Contact via Whatsapp with Basket
						</Button>
					</div>
				</Offcanvas.Body>
			</Offcanvas>
		</>
	);
}
