import { DEFAULT_BASE_CURRENCY, SELECTED_BASE_CURRENCY_KEY } from "./constants";

export const getOrSetDefaultBaseCurrency = () => {
	const baseCurrencyItem = localStorage.getItem(SELECTED_BASE_CURRENCY_KEY);
	if (baseCurrencyItem) {
		return JSON.parse(baseCurrencyItem);
	} else {
		localStorage.setItem(SELECTED_BASE_CURRENCY_KEY, JSON.stringify(DEFAULT_BASE_CURRENCY));
		return DEFAULT_BASE_CURRENCY;
	}
};
