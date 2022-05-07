import React, { createContext, useState } from "react";

export const Context = createContext();

export const Provider = ({ children }) => {
	const [basket, setBasket] = useState([]);
	const [whatsappmessage, setWhatsappmessage] = useState("");

	const [showBasket, setShowBasket] = useState(false);

	const [basketRegionPrice, setbasketRegionPrice] = useState(null);

	const value = {
		basket,
		setBasket,
		whatsappmessage,
		setWhatsappmessage,
		showBasket,
		setShowBasket,
	};

	return <Context.Provider value={value}>{children}</Context.Provider>;
};
