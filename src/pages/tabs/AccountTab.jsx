import { useEffect, useState } from "react";
import { CurrencySelectorForm } from "../../components/CurrencySelectorForm";
import { useModal } from "../../context/ModalContext";
import accountTabStyles from "../../styles/AccountTab.module.scss";
import dashboardStyles from "../../styles/Dashboard.module.scss";
import { classNames } from "../../utils/classNames";
import { DEFAULT_BASE_CURRENCY, SELECTED_BASE_CURRENCY_KEY, STORAGE_UPDATE_KEY } from "../../utils/constants";

export const AccountTab = () => {
	const { showModal, hideModal } = useModal();

	const [selectedBaseCurrency, setSelectedBaseCurrency] = useState(() => {
		return JSON.parse(localStorage.getItem(SELECTED_BASE_CURRENCY_KEY)) || DEFAULT_BASE_CURRENCY;
	});

	const handleCurrencyChange = () => {
		const initialBaseCurrency = () => {
			return JSON.parse(localStorage.getItem(SELECTED_BASE_CURRENCY_KEY)) || [];
		};

		const handleSaveCurrencies = (selectedCurrencies) => {
			const baseCurrency = selectedCurrencies[0];
			localStorage.setItem(SELECTED_BASE_CURRENCY_KEY, JSON.stringify(baseCurrency));

			hideModal();

			window.dispatchEvent(new CustomEvent(STORAGE_UPDATE_KEY));
		};

		showModal(<CurrencySelectorForm onSave={handleSaveCurrencies} allowMultipleSelection={false} initialCurrencies={initialBaseCurrency} />);
	};

	useEffect(() => {
		const handleStorageUpdate = () => {
			setSelectedBaseCurrency(JSON.parse(localStorage.getItem(SELECTED_BASE_CURRENCY_KEY)) || []);
		};

		window.addEventListener(STORAGE_UPDATE_KEY, handleStorageUpdate);

		return () => {
			window.removeEventListener(STORAGE_UPDATE_KEY, handleStorageUpdate);
		};
	}, []);

	return (
		<>
			<section className={classNames(dashboardStyles["container-section"])}>
				<h1>My Account</h1>
				<div className={accountTabStyles["row"]}>
					<span className={accountTabStyles["optionName"]}>Selected Default Currency</span>
					<div className={accountTabStyles["optionValue"]} onClick={handleCurrencyChange}>
						{selectedBaseCurrency}
					</div>
				</div>
			</section>
		</>
	);
};
