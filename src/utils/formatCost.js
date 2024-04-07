import { numberLocalLocales, numberLocalOptionsObj } from "./constants";

export const formatCost = (cost, type) => {
	return `${type === "expense" ? "-" : "+"}${Number(Math.abs(cost).toFixed(2)).toLocaleString(numberLocalLocales, numberLocalOptionsObj)}`;
};
