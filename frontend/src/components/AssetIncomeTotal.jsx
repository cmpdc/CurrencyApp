import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import styles from "../styles/AssetHeader.module.scss";
import { formatAmount } from "../utils/formatAmount";
import { getOrSetDefaultBaseCurrency } from "../utils/getOrSetDefaultBaseCurrency";

const IncomeTotal = () => {
	const navigate = useNavigate();
	const { data } = useContext(AppContext);

	const baseCurrency = getOrSetDefaultBaseCurrency();

	// Calculate income per currency
	const currencyIncomes = data.reduce((acc, item) => {
		if (item.type === "income") {
			acc[item.currency] = acc[item.currency] || { amount: 0, count: 0 };
			acc[item.currency].amount += item.amount;
			acc[item.currency].count++;
		}
		return acc;
	}, {});

	// Create an array of currencies sorted by the number of income transactions
	const sortedCurrencies = Object.entries(currencyIncomes).sort((a, b) => b[1].count - a[1].count);

	// Calculate total income for all currencies combined
	const total = sortedCurrencies.reduce((total, [_, details]) => total + details.amount, 0);

	return (
		<div className={styles["header-item"]}>
			<div className={styles["header-item-inner"]}>
				<div
					className={styles["left"]}
					onClick={() => {
						navigate("/assets/income");
					}}
				>
					<div>
						{formatAmount({
							amount: total,
							currency: undefined,
						})}
					</div>
					<b>Income</b>
				</div>
				<div className={styles["middle"]}></div>
				<div className={styles["right"]}>
					<b>Top {sortedCurrencies.length > 1 ? "Incomes" : "Income"} </b>
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

export default IncomeTotal;
