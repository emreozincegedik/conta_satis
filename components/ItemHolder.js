import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import { Cards } from "./index";
import items from "./items.json";

// import fs from "fs";
// var fs = require("fs");

export function ItemHolder() {
	const [contalar, setContalar] = useState(items);
	return (
		<Row
			className="row d-flex justify-content-center"
			style={{ marginTop: "0rem" }}
		>
			{contalar.map((conta, i) => (
				<Cards
					key={i}
					id={i}
					title={conta.title}
					desc={conta.desc}
					price={conta.price}
					imgPath={conta.imgPath}
					images={conta.images}
				/>
			))}
		</Row>
	);
}
