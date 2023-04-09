import styles from "../styles/Home.module.css";
import { ItemHolder, Header, Provider, Basket } from "../components";
import fs from "fs";

//burcu özkanat

export default function Home({ items }) {
	return (
		<div className={styles.container}>
			<Provider>
				<Header />
				<ItemHolder items={items} />
				<Basket name="end" />
			</Provider>
		</div>
	);
}

export async function getStaticProps(context) {
	const items = fs.readFileSync("./public/items.json", "utf-8");
	const contalar = JSON.parse(items);
	return { props: { items: contalar } };
}
