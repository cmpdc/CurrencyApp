import { Button, Option, Select } from "@mui/joy";
import { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { useModal } from "../context/ModalContext";
import styles from "../styles/CurrencyTab.module.scss";
import { classNames } from "../utils/classNames";
import { EXCHANGE_RATE_URL_LATEST_FULL, MAX_CURRENCIES_NUM } from "../utils/constants";
import { currencyFullNames } from "../utils/currencyNames";

export const CurrencySelectorForm = ({
	onSave,
	initialCurrencies,
	allowMultipleSelection = false,
	headerTitle = "Selected Currencies",
	width = "400px",
	height = "auto",
}) => {
	const [loading, setLoading] = useState(false);
	const [currencies, setCurrencies] = useState([]);
	const [selectionOpen, setSelectionOpen] = useState(false);
	const [selectedCurrencies, setSelectedCurrencies] = useState(() => {
		return Array.isArray(initialCurrencies) ? initialCurrencies : [initialCurrencies];
	});

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

	const handleCurrencyChange = (event, newValue) => {
		if (!newValue) return;

		if (!allowMultipleSelection && newValue.length > 1) {
			// Allow only the latest selected item to be active
			newValue = [newValue.pop()];
		}

		setSelectedCurrencies(newValue);
		setSelectionOpen(!selectionOpen);
	};

	const handleRemoveSelectedCurrency = (event, currencyToRemove) => {
		event.stopPropagation();
		event.preventDefault();

		const updatedCurrencies = selectedCurrencies.filter((currency) => currency !== currencyToRemove);

		setSelectedCurrencies(updatedCurrencies);
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

	const renderCurrencyAbbreviations = (currenciesList) => {
		if (!currenciesList || currenciesList.length === 0) return;

		return (
			<div className={styles["currencyOptionSelected"]}>
				{currenciesList
					.filter((currency) => currency)
					.map((currency) => {
						return currency.value;
					})
					.join(", ")}
			</div>
		);
	};

	return (
		<div
			className={classNames(styles["currencySelectorContainer"], {
				[styles["multiple"]]: allowMultipleSelection,
			})}
			style={{
				width: width,
				height: height,
			}}
		>
			{loading ? (
				<p>Loading currencies...</p>
			) : (
				<>
					{headerTitle && <h3 className={styles["title"]}>{headerTitle}</h3>}
					<div className={styles["currencyOptionsContainer"]}>
						{allowMultipleSelection && (
							<div className={styles["currencySelectedOptions"]}>
								{selectedCurrencies.length ? (
									selectedCurrencies.map((selectedCurrency) => {
										return (
											<div key={selectedCurrency} className={styles["currencySelectedOption"]}>
												<span className={styles["currencySelectedOptionName"]}>{currencyFullNames[selectedCurrency]}</span>
												<span
													onClick={(e) => {
														handleRemoveSelectedCurrency(e, selectedCurrency);
													}}
													className={styles["currencySelectedOptionRemoveButton"]}
												>
													<IoIosClose />
												</span>
											</div>
										);
									})
								) : (
									<span className={styles["currencyEmptySelection"]}>Nothing is selected</span>
								)}
							</div>
						)}
						<Select
							value={selectedCurrencies}
							renderValue={renderCurrencyAbbreviations}
							multiple={true} // NOTE: ALWAYS true
							onChange={handleCurrencyChange}
							onListboxOpenChange={(isOpen) => {
								setSelectionOpen(isOpen);
							}}
							listboxOpen={selectionOpen}
							defaultListboxOpen={false}
							style={{ width: "100%" }}
						>
							{currencies.map((currency) => {
								return (
									<Option key={currency} value={currency}>
										{currencyFullNames[currency]}
									</Option>
								);
							})}
						</Select>
					</div>
					<div className={styles["currencyNotification"]}>
						{allowMultipleSelection && selectedCurrencies.length > MAX_CURRENCIES_NUM && (
							<span>You can only select up to {MAX_CURRENCIES_NUM} currencies</span>
						)}
					</div>
					<div className={styles["buttonContainer"]}>
						<Button onClick={handleSave} disabled={selectedCurrencies.length > MAX_CURRENCIES_NUM} size="sm" variant="solid">
							Save
						</Button>
					</div>
				</>
			)}
		</div>
	);
};
