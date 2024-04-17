import { AssetHeader } from "../components/AssetHeader";
import styles from "../styles/Dashboard.module.scss";
import { classNames } from "../utils/classNames";

export const Home = () => {
	return (
		<>
			<section className={classNames(styles["container-section"])}>
				<h1>Dashboard</h1>

				<h3>My Assets</h3>
				<AssetHeader />

				<h3>Currencies</h3>
			</section>
		</>
	);
};
