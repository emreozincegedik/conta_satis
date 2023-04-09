import "../styles/main.css";
import "../styles/globals.css";
import Head from "next/head";
import { SSRProvider } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
	return (
		<SSRProvider>
			<Head>
				<title>Sefaudi</title>
				<meta name="author" content="Sefa Özincegedik" />
				<meta charSet="UTF-8" />
				<meta name="description" content="Selling leather cup" />
				<meta
					name="keywords"
					content="Leather cup, pump cup, pressure stove, kerosene lantern, blowtorch, primus stove, optimus stove, vintage cooker, brass stove, camping lantern, camping stove, sefaudi"
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="container">
				<Component {...pageProps} />
				<Script
					src="https://www.googletagmanager.com/gtag/js?id=G-JXYQDS45J4"
					strategy="afterInteractive"
				/>
				<Script id="google-analytics" strategy="afterInteractive">
					{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-JXYQDS45J4');
        `}
				</Script>
			</div>
		</SSRProvider>
	);
}

export default MyApp;
