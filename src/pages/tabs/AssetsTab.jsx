import styles from "../../styles/Dashboard.module.scss";
import { classNames } from "../../utils/classNames";

export const AssetsTab = () => {
	return (
		<>
			<section className={classNames(styles["container-section"])}>
				<h1>My Assets</h1>
			</section>
		</>
	);
};
