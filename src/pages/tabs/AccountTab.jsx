import styles from "../../styles/Dashboard.module.scss";
import { classNames } from "../../utils/classNames";

export const AccountTab = () => {
	return (
		<>
			<section className={classNames(styles["container-section"])}>
				<h1>My Account</h1>
			</section>
		</>
	);
};
