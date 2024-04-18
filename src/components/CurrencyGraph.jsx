import { CategoryScale, Chart as ChartJS, Legend, LineElement, LinearScale, PointElement, Title, Tooltip } from "chart.js";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import currencyTabStyles from "../styles/CurrencyTab.module.scss";
import dashboardStyles from "../styles/Dashboard.module.scss";
import { classNames } from "../utils/classNames";
import { API_KEY, EXCHANGE_RATE_URL_BASIC } from "../utils/constants";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const CurrencyGraph = ({ currencies, baseCurrency }) => {
	const [chartData, setChartData] = useState({
		datasets: [],
	});

	const [activeCurrency, setActiveCurrency] = useState(currencies[0]);
	const [interval, setInterval] = useState("1Y");

	useEffect(() => {
		let isMounted = true;

		const fetchRates = async () => {
			const endDate = new Date();
			const startDate = new Date();
			switch (interval) {
				case "1W":
					startDate.setDate(endDate.getDate() - 7);
					break;
				case "1M":
					startDate.setMonth(endDate.getMonth() - 1);
					break;
				case "3M":
					startDate.setMonth(endDate.getMonth() - 3);
					break;
				case "6M":
					startDate.setMonth(endDate.getMonth() - 6);
					break;
				case "1Y":
				default:
					startDate.setFullYear(endDate.getFullYear() - 1);
					break;
			}

			const startDateFormatted = startDate.toISOString().slice(0, 10);
			const endDateFormatted = endDate.toISOString().slice(0, 10);

			const url = `${EXCHANGE_RATE_URL_BASIC}/timeseries?access_key=${API_KEY}&base=${baseCurrency}&symbols=${activeCurrency}&start_date=${startDateFormatted}&end_date=${endDateFormatted}`;

			try {
				const response = await fetch(url);
				const data = await response.json();

				if (data && data.rates && isMounted) {
					const labels = Object.keys(data.rates).sort();
					const datasetData = labels.map((label) => data.rates[label][activeCurrency]);

					setChartData({
						labels,
						datasets: [
							{
								label: `Exchange rate of ${activeCurrency} to ${baseCurrency}`,
								data: datasetData,
								borderColor: "rgb(75, 192, 192)",
								tension: 0.1,
							},
						],
					});
				}
			} catch (error) {
				console.error("Failed to fetch exchange rates:", error);
			}
		};

		fetchRates();

		return () => {
			isMounted = false;
		};
	}, [baseCurrency, activeCurrency, interval]);

	const handleCurrencyChange = (currency) => {
		setActiveCurrency(currency);
	};

	const handleIntervalChange = (selectedInterval) => {
		setInterval(selectedInterval);
	};

	return (
		<>
			<div className={currencyTabStyles["currencyGraph"]}>
				<Line data={chartData} />
				<ul
					className={classNames(
						currencyTabStyles["currencyGraphButtons"],
						currencyTabStyles["currencyGraphIntervals"],
						dashboardStyles["nav-tabs"],
					)}
				>
					{["1Y", "6M", "3M", "1M", "1W"].map((period) => (
						<li
							key={period}
							onClick={() => handleIntervalChange(period)}
							className={classNames(currencyTabStyles["currencyGraphButton"], dashboardStyles["tab-item"], {
								[dashboardStyles["tab-active"]]: interval === period,
							})}
						>
							{period}
						</li>
					))}
				</ul>
				<li className={classNames(currencyTabStyles["currencyGraphButtons"], dashboardStyles["nav-tabs"])}>
					{currencies.map((currency) => (
						<div
							key={currency}
							className={classNames(currencyTabStyles["currencyGraphButton"], dashboardStyles["tab-item"], {
								[dashboardStyles["tab-active"]]: activeCurrency === currency,
							})}
							onClick={() => handleCurrencyChange(currency)}
						>
							{currency}
						</div>
					))}
				</li>
			</div>
		</>
	);
};
