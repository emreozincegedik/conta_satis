import "../styles/globals.css";
import Head from "next/head";
import { useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

function MyApp({ Component, pageProps }) {
	return (
		<div>
			<Head>
				<title>Sefaudi</title>
				<meta name="sefaudi" content="conta, gaz ocağı, pompa" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="container">
				<Component {...pageProps} />
			</div>
			<style jsx global>
				{`
					body {
						background: #f7f7f7;
					}
				`}
			</style>
		</div>
	);
}

export default MyApp;
