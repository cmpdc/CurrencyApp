import { useEffect, useState } from "react";
import { AssetHeader } from "../../components/AssetHeader";
import { CurrencyList } from "../../components/CurrencyList";
import styles from "../../styles/Dashboard.module.scss";
import { classNames } from "../../utils/classNames";
import { DEFAULT_BASE_CURRENCY, SELECTED_BASE_CURRENCY_KEY, STORAGE_UPDATE_KEY } from "../../utils/constants";

export const HomeTab = () => {
	const [baseCurrency, setBaseCurrency] = useState(() => {
		return JSON.parse(localStorage.getItem(SELECTED_BASE_CURRENCY_KEY) || DEFAULT_BASE_CURRENCY);
	});

	useEffect(() => {
		const handleStorageChange = (event) => {
			setBaseCurrency(JSON.parse(localStorage.getItem(SELECTED_BASE_CURRENCY_KEY) || DEFAULT_BASE_CURRENCY));
		};

		window.addEventListener(STORAGE_UPDATE_KEY, handleStorageChange);

		return () => {
			window.removeEventListener(STORAGE_UPDATE_KEY, handleStorageChange);
		};
	}, [setBaseCurrency]);

	return (
		<>
			<section className={classNames(styles["container-section"])}>
				<h1>Dashboard</h1>

				<h3>My Assets</h3>
				<AssetHeader />

				<h3>Selected Currencies</h3>
				<CurrencyList activeCurrency={baseCurrency} />
			</section>
		</>
	);
};
