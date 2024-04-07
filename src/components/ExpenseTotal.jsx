import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { numberLocalLocales, numberLocalOptionsObj } from "../utils/constants";

const ExpenseTotal = () => {
	const { data } = useContext(AppContext);

	const total = data.filter((item) => item.type === "expense").reduce((total, item) => total + item.cost, 0);

	return (
		<span>
			<b>Expenses:</b> <span>{Number(total).toLocaleString(numberLocalLocales, numberLocalOptionsObj)}</span>
		</span>
	);
};

export default ExpenseTotal;
