import { useContext, useEffect, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import { classNames } from "../utils/classNames";
import { formatAmount } from "../utils/formatAmount";
import { getOrSetDefaultBaseCurrency } from "../utils/getOrSetDefaultBaseCurrency";

const Balance = () => {
	const { data } = useContext(AppContext);

	const totalExpenses = data.filter((item) => item.type === "expense").reduce((total, item) => total + item.amount, 0);
	const totalIncome = data.filter((item) => item.type === "income").reduce((total, item) => total + item.amount, 0);
	const total = totalIncome - totalExpenses;

	const [isBelowZero, setBelowZero] = useState(total < 0);

	const baseCurrency = getOrSetDefaultBaseCurrency();

	useEffect(() => {
		setBelowZero(total < 0);
	}, [total]);

	return (
		<>
			<div
				className={classNames({
					positive: !isBelowZero,
					negative: isBelowZero,
				})}
			>
				{formatAmount({
					amount: total,
					currency: baseCurrency,
				})}
			</div>
			<b>Balance</b>{" "}
		</>
	);
};

export default Balance;
