import { useEffect, useState } from "react";
import { useModal } from "../context/ModalContext";
import styles from "../styles/CurrencyTab.module.scss";
import { classNames } from "../utils/classNames";
import { EXCHANGE_RATE_URL_LATEST_FULL, MAX_CURRENCIES_NUM } from "../utils/constants";

export const CurrencySelectorForm = ({ onSave, initialCurrencies, allowMultipleSelection = false, headerTitle = "Select Currency" }) => {
	const [currencies, setCurrencies] = useState([]);
	const [loading, setLoading] = useState(false);
	const [selectedCurrencies, setSelectedCurrencies] = useState(initialCurrencies);

	const { hideModal } = useModal();

	useEffect(() => {
		const fetchCurrencies = async () => {
			setLoading(true);
			try {
				const response = await fetch(`${EXCHANGE_RATE_URL_LATEST_FULL}`);
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const data = await response.json();
				if (data && data.rates) {
					setCurrencies(Object.keys(data.rates));
				} else {
					console.log("No rates data available:", data);
				}
			} catch (error) {
				console.error("Failed to fetch currencies:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchCurrencies();
	}, []);

	const handleCurrencyChange = (event) => {
		const selectedOptions = Array.from(event.target.options)
			.filter((option) => option.selected)
			.map((option) => option.value);

		setSelectedCurrencies(selectedOptions);
	};

	const handleSave = () => {
		if (allowMultipleSelection && selectedCurrencies.length > MAX_CURRENCIES_NUM) {
			return;
		}

		if (onSave) {
			onSave(selectedCurrencies);
		}

		hideModal();
	};

	return (
		<div
			className={classNames(styles["currencySelectorContainer"], {
				[styles["multiple"]]: allowMultipleSelection,
			})}
		>
			{loading ? (
				<p>Loading currencies...</p>
			) : (
				<>
					<h3 className={styles["title"]}>{headerTitle}</h3>
					<div className={styles["currencyOptionsContainer"]}>
						<select
							multiple={allowMultipleSelection}
							value={selectedCurrencies}
							onChange={handleCurrencyChange}
							style={{ width: "100%" }}
						>
							{currencies.map((currency) => (
								<option key={currency} value={currency}>
									{currency}
								</option>
							))}
						</select>
					</div>
					<div className={styles["currencyNotification"]}>
						{allowMultipleSelection && selectedCurrencies.length > MAX_CURRENCIES_NUM && (
							<span>You can only select up to {MAX_CURRENCIES_NUM} currencies</span>
						)}
					</div>
					<div className={styles["buttonContainer"]}>
						<button onClick={handleSave}>Save</button>
					</div>
				</>
			)}
		</div>
	);
};
