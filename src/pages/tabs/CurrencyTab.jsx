import styles from "../../styles/Dashboard.module.scss";
import { classNames } from "../../utils/classNames";

export const CurrencyTab = () => {
	return (
		<>
			<section className={classNames(styles["container-section"])}>
				<h1>Currency</h1>
			</section>
		</>
	);
};
