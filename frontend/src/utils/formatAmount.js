import { numberLocalLocales } from "./constants";

export const formatAmount = ({ amount, type, currency }) => {
	const prefix = type ? (type === "expense" ? "-" : "+") : "";
	const formattedAmount = new Intl.NumberFormat(
		numberLocalLocales,
		currency
			? {
					style: "currency",
					currency: currency,
					minimumFractionDigits: 2,
				}
			: {
					minimumFractionDigits: 2,
				},
	).format(amount);

	const regex = new RegExp(`^${currency}\\D`);
	const hasCurrencyCode = regex.test(formattedAmount);

	const returnValue = hasCurrencyCode ? `${formattedAmount.replace(regex, "").trim()} ${currency}` : formattedAmount;

	return `${prefix}${returnValue}`;
};
