import Balance from "../components/Balance";
import ExpenseTotal from "../components/ExpenseTotal";
import IncomeTotal from "../components/IncomeTotal";
import styles from "../styles/Dashboard.module.scss";
import { classNames } from "../utils/classNames";

export const Home = () => {
	return (
		<>
			<section className={classNames(styles["container-section"])}>
				<h1>Dashboard</h1>

				<h3>My Assets</h3>
				<div className={styles["assets-row"]}>
					<div className={classNames([styles["asset-container"], styles["total"]])}>
						<div className={classNames([styles["asset-container-inner"]])}>
							<Balance />
						</div>
					</div>
					<div className={classNames([styles["asset-container"], styles["income"]])}>
						<div className={classNames([styles["asset-container-inner"]])}>
							<IncomeTotal />
						</div>
					</div>
					<div className={classNames([styles["asset-container"], styles["expenses"]])}>
						<div className={classNames([styles["asset-container-inner"]])}>
							<ExpenseTotal />
						</div>
					</div>
				</div>

				<h3>Currencies</h3>
			</section>
		</>
	);
};
