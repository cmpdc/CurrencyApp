import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { numberLocalLocales, numberLocalOptionsObj } from "../utils/constants";

const IncomeTotal = () => {
	const { data } = useContext(AppContext);

	const total = data.filter((item) => item.type === "income").reduce((total, item) => total + item.cost, 0);

	return (
		<>
			<span>
				<b>Income:</b> <span>{Number(total).toLocaleString(numberLocalLocales, numberLocalOptionsObj)}</span>
			</span>
		</>
	);
};

export default IncomeTotal;
