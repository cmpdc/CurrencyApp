import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import styles from "../styles/AssetHeader.module.scss";
import { classNames } from "../utils/classNames";
import { formatAmount } from "../utils/formatAmount";

const Balance = () => {
	const navigate = useNavigate();
	const { data } = useContext(AppContext);

	// Calculate total balance
	const totalExpenses = data.filter((item) => item.type === "expense").reduce((total, item) => total + item.amount, 0);
	const totalIncome = data.filter((item) => item.type === "income").reduce((total, item) => total + item.amount, 0);
	const total = totalIncome - totalExpenses;

	// Calculate balance per currency
	const currencyBalances = data.reduce((acc, item) => {
		acc[item.currency] = acc[item.currency] || { income: 0, expense: 0, balance: 0, count: 0 };
		if (item.type === "income") {
			acc[item.currency].income += item.amount;
		} else {
			acc[item.currency].expense += item.amount;
		}
		acc[item.currency].balance = acc[item.currency].income - acc[item.currency].expense;
		acc[item.currency].count++;
		return acc;
	}, {});

	const sortedCurrencies = Object.entries(currencyBalances).sort((a, b) => b[1].count - a[1].count);

	const [isBelowZero, setBelowZero] = useState(total < 0);

	useEffect(() => {
		setBelowZero(total < 0);
	}, [total]);

	return (
		<div className={styles["header-item"]}>
			<div className={styles["header-item-inner"]}>
				<div
					className={styles["left"]}
					onClick={() => {
						navigate("/assets/all");
					}}
				>
					<div
						className={classNames({
							positive: !isBelowZero,
							negative: isBelowZero,
						})}
					>
						{formatAmount({
							amount: total,
							currency: undefined,
						})}
					</div>
					<b>Balance</b>
				</div>
				<div className={styles["middle"]}></div>
				<div className={styles["right"]}>
					<b>Top {sortedCurrencies.length > 1 ? "Balances" : "Balance"} </b>
					<ul className={styles["sortedList"]}>
						{sortedCurrencies.map(([currency, details]) => (
							<li key={currency}>
								<span>{currency}:</span>
								<span>
									{formatAmount({
										amount: details.balance,
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

export default Balance;
