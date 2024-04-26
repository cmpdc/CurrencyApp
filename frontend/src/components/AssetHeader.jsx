import dashboardStyles from "../styles/Dashboard.module.scss";
import { classNames } from "../utils/classNames";
import Balance from "./AssetBalance";
import ExpenseTotal from "./AssetExpenseTotal";
import IncomeTotal from "./AssetIncomeTotal";

export const AssetHeader = () => {
	return (
		<>
			<div className={classNames(dashboardStyles["assets-row"], dashboardStyles["assets-row-spacing"])}>
				<div className={classNames([dashboardStyles["asset-container"], dashboardStyles["total"]])}>
					<div className={classNames([dashboardStyles["asset-container-inner"]])}>
						<Balance />
					</div>
				</div>
				<div className={classNames([dashboardStyles["asset-container"], dashboardStyles["income"]])}>
					<div className={classNames([dashboardStyles["asset-container-inner"]])}>
						<IncomeTotal />
					</div>
				</div>
				<div className={classNames([dashboardStyles["asset-container"], dashboardStyles["expenses"]])}>
					<div className={classNames([dashboardStyles["asset-container-inner"]])}>
						<ExpenseTotal />
					</div>
				</div>
			</div>
		</>
	);
};
