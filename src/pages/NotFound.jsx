import { NavigationBar } from "../components/NavigationBar";
import styles from "../styles/Dashboard.module.scss";
import { classNames } from "../utils/classNames";

export const NotFoundPage = () => {
	return (
		<>
			<NavigationBar />
			<div className={styles["container"]}>
				<section className={classNames(styles["container-section"])}>
					<h1>404 Not Found</h1>
				</section>
			</div>
		</>
	);
};
