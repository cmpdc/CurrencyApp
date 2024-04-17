import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { classNames } from "../utils/classNames";
import { numberLocalLocales, numberLocalOptionsObj } from "../utils/constants";

const Balance = () => {
	const { data } = useContext(AppContext);

	const totalExpenses = data.filter((item) => item.type === "expense").reduce((total, item) => total + item.cost, 0);
	const totalIncome = data.filter((item) => item.type === "income").reduce((total, item) => total + item.cost, 0);
	const total = totalIncome - totalExpenses;

	const [isBelowZero, setBelowZero] = useState(total < 0);

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
				{Number(total).toLocaleString(numberLocalLocales, numberLocalOptionsObj)}
			</div>
			<b>Balance</b>{" "}
		</>
	);
};

export default Balance;
