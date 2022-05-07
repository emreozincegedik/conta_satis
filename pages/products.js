import Image from "next/image";
import styles from "../styles/Home.module.css";
import { ItemHolder, Header } from "../components";

const fetchItems = async () => {};

export default function Home() {
	return (
		<div className={styles.container}>
			<Header />
			<ItemHolder />
		</div>
	);
}
