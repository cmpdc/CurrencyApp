export const recentCounter = 3;
export const numberLocalLocales = "en-US";
export const numberLocalOptionsObj = {
	style: "currency",
	currency: "USD",
	minimumFractionDigits: 2,
};

export const API_KEY = import.meta.env.VITE_CURRENCY_API_KEY;
export const EXCHANGE_RATE_URL = `https://api.exchangeratesapi.io/v1/latest?access_key=${API_KEY}`;

export const MAX_CURRENCIES_NUM = 6;
export const DEFAULT_BASE_CURRENCY = "USD";

export const SELECTED_CURRENCIES_KEY = "selectedCurrencies";
export const SELECTED_BASE_CURRENCY_KEY = "selectedBaseCurrency";

export const STORAGE_UPDATE_KEY = "storage:update";
