import { Button, Option, Select } from "@mui/joy";
import { Reorder } from "framer-motion";
import { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { useModal } from "../contexts/ModalContext";
import styles from "../styles/CurrencyTab.module.scss";
import { classNames } from "../utils/classNames";
import { EXCHANGE_RATE_URL_LATEST_FULL, MAX_CURRENCIES_NUM } from "../utils/constants";
import { currencyFullNames } from "../utils/currencyNames";

export const CurrencySelectorForm = ({
	onSave,
	onCurrencyChange,
	initialCurrencies,
	allowMultipleSelection = false,
	headerTitle = "Selected Quote Currencies",
	width = "400px",
	height = "auto",
	closeOnSave = false,
	showSaveButton = false,
	disabled = false,
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

		if (onCurrencyChange) {
			onCurrencyChange(newValue);
		}
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

		if (closeOnSave) {
			hideModal();
		}
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

	const renderSelectedCurrencies = () => {
		return (
			<>
				{selectedCurrencies.length ? (
					<Reorder.Group values={selectedCurrencies} onReorder={setSelectedCurrencies}>
						{selectedCurrencies.map((selectedCurrency) => (
							<Reorder.Item
								key={selectedCurrency}
								value={selectedCurrency}
								className={styles["currencySelectedOption"]}
								initial={{ opacity: 0, x: 50 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -50 }}
								drag={true}
								dragConstraints={{ left: 0, right: 0 }}
								layout
							>
								<span className={styles["currencySelectedOptionName"]}>{currencyFullNames[selectedCurrency]}</span>
								<span
									onClick={(e) => handleRemoveSelectedCurrency(e, selectedCurrency)}
									className={styles["currencySelectedOptionRemoveButton"]}
								>
									<IoIosClose />
								</span>
							</Reorder.Item>
						))}
					</Reorder.Group>
				) : (
					<span className={styles["currencyEmptySelection"]}>Nothing is selected</span>
				)}
			</>
		);
	};

	return (
		<div
			className={classNames(styles["currencySelectorContainer"], {
				[styles["multiple"]]: allowMultipleSelection,
				[styles["disabled"]]: disabled,
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
						{allowMultipleSelection && <div className={styles["currencySelectedOptions"]}>{renderSelectedCurrencies()}</div>}
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
							style={{ width: "100%", height: "38px" }}
							disabled={disabled}
							size="md"
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
					{showSaveButton && (
						<div className={styles["buttonContainer"]}>
							<Button onClick={handleSave} disabled={selectedCurrencies.length > MAX_CURRENCIES_NUM} size="sm" variant="solid">
								Save
							</Button>
						</div>
					)}
				</>
			)}
		</div>
	);
};
