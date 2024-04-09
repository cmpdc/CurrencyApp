import styles from "../../styles/Dashboard.module.scss";
import { classNames } from "../../utils/classNames";

export const LogoutTab = () => {
	return (
		<>
			<section className={classNames(styles["container-section"])}>
				<h1>Logout</h1>
			</section>
		</>
	);
};
