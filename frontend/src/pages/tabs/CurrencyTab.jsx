import { useContext, useState } from "react";
import { CurrencyGraph } from "../../components/CurrencyGraph";
import { CurrencyList } from "../../components/CurrencyList";
import { CurrencySelectorForm } from "../../components/CurrencySelectorForm";
import { AppContext } from "../../contexts/AppContext";
import { useModal } from "../../contexts/ModalContext";
import currencyTabStyles from "../../styles/CurrencyTab.module.scss";
import dashboardStyles from "../../styles/Dashboard.module.scss";
import { classNames } from "../../utils/classNames";
import { MAX_CURRENCIES_NUM, SELECTED_CURRENCIES_KEY, STORAGE_UPDATE_KEY } from "../../utils/constants";
import { getOrSetDefaultBaseCurrency } from "../../utils/getOrSetDefaultBaseCurrency";

export const CurrencyTab = () => {
	const { showModal, hideModal } = useModal();
	const { currencies } = useContext(AppContext);

	const [activeCurrency, setActiveCurrency] = useState(currencies[0]);

	const baseCurrency = getOrSetDefaultBaseCurrency();

	const initialCurrencies = () => {
		return JSON.parse(localStorage.getItem(SELECTED_CURRENCIES_KEY)) || currencies;
	};

	const handleAddCurrencyClick = () => {
		showModal({
			content: (
				<CurrencySelectorForm
					allowMultipleSelection={true}
					initialCurrencies={initialCurrencies()}
					closeOnSave
					showSaveButton
					onSave={(selectedCurrencies) => {
						localStorage.setItem(SELECTED_CURRENCIES_KEY, JSON.stringify(selectedCurrencies));

						hideModal();

						window.dispatchEvent(new CustomEvent(STORAGE_UPDATE_KEY));
					}}
				/>
			),
		});
	};

	const handleCurrencyChange = (currency) => {
		setActiveCurrency(currency);
	};

	return (
		<>
			<section className={classNames(dashboardStyles["container-section"], currencyTabStyles["currencyTab"])}>
				<h1>Currency</h1>
				<CurrencyGraph currencies={initialCurrencies()} baseCurrency={baseCurrency} onCurrencyChange={handleCurrencyChange} />
				<div className={currencyTabStyles["gapFromGraph"]}>
					<div
						ref={(node) => {
							node?.style.setProperty("margin", "0", "important");
						}}
						className={currencyTabStyles["headerTitle"]}
					>
						<h3 className={currencyTabStyles["headerQuoteCurrency"]}>Selected Quote Currencies</h3>
						<span className={currencyTabStyles["headerBaseCurrency"]}>1 {baseCurrency}</span>
					</div>
					<CurrencyList allowSelection={true} activeCurrency={activeCurrency} />
				</div>
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
