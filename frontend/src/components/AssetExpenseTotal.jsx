import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { formatAmount } from "../utils/formatAmount";
import { getOrSetDefaultBaseCurrency } from "../utils/getOrSetDefaultBaseCurrency";

const ExpenseTotal = () => {
	const { data } = useContext(AppContext);

	const baseCurrency = getOrSetDefaultBaseCurrency();

	const total = data.filter((item) => item.type === "expense").reduce((total, item) => total + item.amount, 0);

	return (
		<>
			<div>
				{formatAmount({
					amount: total,
					currency: baseCurrency,
				})}
			</div>
			<b>Expenses</b>
		</>
	);
};

export default ExpenseTotal;
