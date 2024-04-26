import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import styles from "../styles/AssetHeader.module.scss";
import { formatAmount } from "../utils/formatAmount";
import { getOrSetDefaultBaseCurrency } from "../utils/getOrSetDefaultBaseCurrency";

const ExpenseTotal = () => {
	const navigate = useNavigate();
	const { data } = useContext(AppContext);

	const baseCurrency = getOrSetDefaultBaseCurrency();

	// Calculate expenses per currency
	const currencyExpenses = data.reduce((acc, item) => {
		if (item.type === "expense") {
			acc[item.currency] = acc[item.currency] || { amount: 0, count: 0 };
			acc[item.currency].amount += item.amount;
			acc[item.currency].count++;
		}
		return acc;
	}, {});

	// Create an array of currencies sorted by the number of expense transactions
	const sortedCurrencies = Object.entries(currencyExpenses).sort((a, b) => b[1].count - a[1].count);

	// Calculate total expenses for all currencies combined
	const total = sortedCurrencies.reduce((total, [_, details]) => total + details.amount, 0);

	return (
		<div className={styles["header-item"]}>
			<div className={styles["header-item-inner"]}>
				<div
					className={styles["left"]}
					onClick={() => {
						navigate("/assets/expense");
					}}
				>
					<div>
						{formatAmount({
							amount: total,
							currency: undefined,
						})}
					</div>
					<b>Expenses</b>
				</div>
				<div className={styles["middle"]}></div>
				<div className={styles["right"]}>
					<b>Top {sortedCurrencies.length > 1 ? "Expenses" : "Expense"}</b>
					<ul className={styles["sortedList"]}>
						{sortedCurrencies.map(([currency, details]) => (
							<li key={currency}>
								<span>{currency}:</span>
								<span>
									{formatAmount({
										amount: details.amount,
										currency,
									})}
								</span>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default ExpenseTotal;
