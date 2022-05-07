import styles from "../styles/Home.module.css";
import { ItemHolder, Header, Provider, Basket } from "../components";

export default function Home() {
	return (
		<div className={styles.container}>
			<Provider>
				<Header />
				<ItemHolder />
				<Basket name="end" />
			</Provider>
		</div>
	);
}
