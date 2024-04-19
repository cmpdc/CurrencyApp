import { numberLocalLocales, numberLocalOptionsObj } from "./constants";

export const formatAmount = (amount, type) => {
	return `${type === "expense" ? "-" : "+"}${Number(Math.abs(amount).toFixed(2)).toLocaleString(numberLocalLocales, numberLocalOptionsObj)}`;
};
