import { useNavigate } from "react-router-dom";
import styles from "../styles/Dashboard.module.scss";
import { classNames } from "../utils/classNames";
import Balance from "./AssetBalance";
import ExpenseTotal from "./AssetExpenseTotal";
import IncomeTotal from "./AssetIncomeTotal";

export const AssetHeader = () => {
	const navigate = useNavigate();

	const navigateLink = (type) => () => {
		navigate(`/assets/${type}`);
	};

	return (
		<>
			<div className={classNames(styles["assets-row"], styles["assets-row-spacing"])}>
				<div className={classNames([styles["asset-container"], styles["total"]])} onClick={navigateLink("all")}>
					<div className={classNames([styles["asset-container-inner"]])}>
						<Balance />
					</div>
				</div>
				<div className={classNames([styles["asset-container"], styles["income"]])} onClick={navigateLink("income")}>
					<div className={classNames([styles["asset-container-inner"]])}>
						<IncomeTotal />
					</div>
				</div>
				<div className={classNames([styles["asset-container"], styles["expenses"]])} onClick={navigateLink("expense")}>
					<div className={classNames([styles["asset-container-inner"]])}>
						<ExpenseTotal />
					</div>
				</div>
			</div>
		</>
	);
};
