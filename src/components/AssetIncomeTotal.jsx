import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { numberLocalLocales, numberLocalOptionsObj } from "../utils/constants";

const IncomeTotal = () => {
	const { data } = useContext(AppContext);

	const total = data.filter((item) => item.type === "income").reduce((total, item) => total + item.amount, 0);

	return (
		<>
			<div>{Number(total).toLocaleString(numberLocalLocales, numberLocalOptionsObj)}</div>
			<b>Income</b>
		</>
	);
};

export default IncomeTotal;
