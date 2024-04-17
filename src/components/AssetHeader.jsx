import styles from "../styles/Dashboard.module.scss";
import { classNames } from "../utils/classNames";
import Balance from "./Balance";
import ExpenseTotal from "./ExpenseTotal";
import IncomeTotal from "./IncomeTotal";

export const AssetHeader = () => {
	return (
		<>
			<div className={classNames(styles["assets-row"], styles["assets-row-spacing"])}>
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
		</>
	);
};
