import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import currencyStyles from "../styles/CurrencyTab.module.scss";
import { classNames } from "../utils/classNames";
import { EXCHANGE_RATE_URL_LATEST_FULL, SELECTED_CURRENCIES_KEY, STORAGE_UPDATE_KEY } from "../utils/constants";
import { currencyFullNames } from "../utils/currencyNames";
import { getOrSetDefaultBaseCurrency } from "../utils/getOrSetDefaultBaseCurrency";

export const CurrencyList = ({ allowSelection = false, activeCurrency }) => {
	const { currencies } = useContext(AppContext);

	const baseCurrency = getOrSetDefaultBaseCurrency();

	const initialCurrencies = () => {
		return JSON.parse(localStorage.getItem(SELECTED_CURRENCIES_KEY)) || currencies;
	};

	const [selectedCurrencies, setSelectedCurrencies] = useState(initialCurrencies());
	const [exchangeRates, setExchangeRates] = useState({});

	useEffect(() => {
		const handleStorageUpdate = () => {
			setSelectedCurrencies(JSON.parse(localStorage.getItem(SELECTED_CURRENCIES_KEY)) || currencies);
		};

		window.addEventListener(STORAGE_UPDATE_KEY, handleStorageUpdate);

		return () => {
			window.removeEventListener(STORAGE_UPDATE_KEY, handleStorageUpdate);
		};
	}, [currencies]);

	useEffect(() => {
		let isMounted = true;

		const fetchExchangeRates = async () => {
			const url = `${EXCHANGE_RATE_URL_LATEST_FULL}&base=${baseCurrency}`;
			try {
				const response = await fetch(url);
				const data = await response.json();
				if (data && data.rates && isMounted) {
					setExchangeRates(data.rates);
				}
			} catch (error) {
				console.error("Failed to fetch exchange rates:", error);
			}
		};

		fetchExchangeRates();

		return () => {
			isMounted = false; // Set isMounted to false on cleanup to prevent state update after unmount
		};
	}, [baseCurrency]);

	return (
		<ul
			className={classNames(currencyStyles["currency-list"], {
				[[currencyStyles["currency-list-selection"]]]: allowSelection,
			})}
		>
			{selectedCurrencies.map((currency) => (
				<li
					key={currency}
					className={classNames(currencyStyles["currency-item"], {
						[[currencyStyles["currency-item-selected"]]]: allowSelection && activeCurrency && activeCurrency === currency,
					})}
				>
					<span className={currencyStyles["currencyName"]}>{currencyFullNames[currency] || currency}</span>
					<span className={currencyStyles["currencyValue"]}>
						{exchangeRates[currency] ? (
							<>
								<span className={currencyStyles["valueNum"]}>{exchangeRates[currency].toFixed(4)}</span>
								<span className={currencyStyles["valueCurrency"]}>{baseCurrency}</span>
							</>
						) : (
							"Loading..."
						)}
					</span>
				</li>
			))}
		</ul>
	);
};
