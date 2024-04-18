import { useContext } from "react";
import { CurrencyList } from "../../components/CurrencyList";
import { CurrencySelectorForm } from "../../components/CurrencySelectorForm";
import { AppContext } from "../../context/AppContext";
import { useModal } from "../../context/ModalContext";
import currencyTabStyles from "../../styles/CurrencyTab.module.scss";
import dashboardStyles from "../../styles/Dashboard.module.scss";
import { classNames } from "../../utils/classNames";
import { MAX_CURRENCIES_NUM, SELECTED_CURRENCIES_KEY, STORAGE_UPDATE_KEY } from "../../utils/constants";

export const CurrencyTab = () => {
	const { showModal, hideModal } = useModal();
	const { currencies } = useContext(AppContext);

	const initialCurrencies = () => {
		return JSON.parse(localStorage.getItem(SELECTED_CURRENCIES_KEY)) || currencies;
	};

	const handleAddCurrencyClick = () => {
		showModal(
			<CurrencySelectorForm
				allowMultipleSelection={true}
				initialCurrencies={initialCurrencies()}
				onSave={(selectedCurrencies) => {
					localStorage.setItem(SELECTED_CURRENCIES_KEY, JSON.stringify(selectedCurrencies));

					hideModal();

					window.dispatchEvent(new CustomEvent(STORAGE_UPDATE_KEY));
				}}
			/>,
		);
	};

	return (
		<>
			<section className={classNames(dashboardStyles["container-section"], currencyTabStyles["currencyTab"])}>
				<h1>Currency</h1>
				<CurrencyList />
				<div className={dashboardStyles["buttonContainer"]}>
					{initialCurrencies().length < MAX_CURRENCIES_NUM && (
						<div className={currencyTabStyles["buttonContainer"]}>
							<button onClick={handleAddCurrencyClick} className={currencyTabStyles["addCurrencyButton"]}>
								Add Currency
							</button>
						</div>
					)}
				</div>
			</section>
		</>
	);
};
