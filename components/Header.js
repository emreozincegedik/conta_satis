import React from "react";
import { Row } from "react-bootstrap";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
export function Header() {
	return (
		<div
			className="d-flex justify-content-around align-items-center flex-column container"
			style={{
				margin: "0rem",
				// height: "20rem",
				marginTop: "3rem",
				paddingTop: "3rem",
				paddingBottom: "3rem",
				background: "#26d3bc",
			}}
		>
			<h1>Welcome to Sefaudi Store!</h1>

			<div className="d-flex justify-content-around align-items-center flex-column">
				<h4>
					I only sell pump cup leathers for various items such as stoves,
					lanterns, blowtorches.
				</h4>
				<h4> Leather cups are produced by myself.</h4>
				<br />
				<h4>
					<span style={{ textDecoration: "underline" }}>Postage</span>:
					International small packet with tracking number
					<li>$6,5 Europe (including UK)</li> <li> $8,5 Rest of the world</li>
				</h4>
				<br />
				<h4>
					After you see below listings and decide what items to buy, please
					contact me via below options:
				</h4>
				<h4>
					{" "}
					via{" "}
					<a
						style={{ color: "#25D366" }}
						target="_blank"
						href="http://wa.me/905322256457/?text=Hello Sefa"
					>
						WhatsApp +90 532 225 64 57 <FaWhatsapp />
					</a>
				</h4>
				<h4>
					via Email{" "}
					<span style={{ color: "#c71610" }}>
						ozincegedik@gmail.com <SiGmail />
					</span>
				</h4>

				<h3>Only bank transfers are accepted.</h3>
			</div>
		</div>
	);
}
