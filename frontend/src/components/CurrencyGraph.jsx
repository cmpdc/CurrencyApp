import { CategoryScale, Chart as ChartJS, Filler, Legend, LineElement, LinearScale, PointElement, Title, Tooltip } from "chart.js";
import { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import currencyTabStyles from "../styles/CurrencyTab.module.scss";
import dashboardStyles from "../styles/Dashboard.module.scss";
import { classNames } from "../utils/classNames";
import { API_KEY, EXCHANGE_RATE_URL_BASIC } from "../utils/constants";

const verticalLinePlugin = {
	id: "verticalLine",
	afterDraw: (chart, args, options) => {
		const { ctx, tooltip } = chart;

		if (tooltip && tooltip.getActiveElements().length) {
			const { x } = tooltip.getActiveElements()[0].element;
			const topY = chart.scales.y.top;
			const bottomY = chart.scales.y.bottom;

			ctx.save();
			ctx.beginPath();
			ctx.moveTo(x, topY);
			ctx.lineTo(x, bottomY);
			ctx.lineWidth = 1;
			ctx.strokeStyle = "rgba(253, 126, 20, 0.7)";
			ctx.stroke();
			ctx.restore();
		}
	},
};

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, verticalLinePlugin);

const graphBorderColor = "rgb(253, 126, 20)";

export const CurrencyGraph = ({ currencies, baseCurrency, onCurrencyChange }) => {
	const [chartData, setChartData] = useState({
		datasets: [],
	});

	const [isLoading, setLoading] = useState(true);
	const [activeCurrency, setActiveCurrency] = useState(currencies[0]);
	const [interval, setInterval] = useState("1Y");
	const [maxYTicks, setMaxYTicks] = useState(12);

	const graphContainerRef = useRef();
	const graphRef = useRef();

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

				if (!isMounted) return;

				if (data && data.rates) {
					const labels = Object.keys(data.rates).sort();
					const datasetData = labels.map((label) => data.rates[label][activeCurrency]);

					const chartContainer = graphContainerRef.current;
					if (chartContainer && isMounted) {
						setChartData({
							labels,
							datasets: [
								{
									label: `${activeCurrency} to ${baseCurrency}`,
									data: datasetData,
									borderColor: "rgb(253, 126, 20)",
									backgroundColor: (context) => {
										const chart = context.chart;
										const { ctx, chartArea } = chart;

										if (!chartArea) {
											return;
										}

										const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
										gradient.addColorStop(1, "rgba(253, 126, 20, 0.7)");
										gradient.addColorStop(0, "rgba(253, 126, 20, 0)");

										return gradient;
									},
									tension: 0.2,
									pointRadius: 0,
									pointHoverRadius: 4,
									pointBackgroundColor: "rgb(161, 73, 0)",
									pointHoverBackgroundColor: "rgb(253, 126, 20)",
									pointBorderColor: "rgb(161, 73, 0)",
									pointHoverBorderColor: "rgb(161, 73, 0)",
									fill: "start",
									hoverBackgroundColor: "rgb(253, 126, 20)",
									hoverBorderColor: "rgb(161, 73, 0)",
								},
							],
						});
					}
				}
			} catch (error) {
				console.error("Failed to fetch exchange rates:", error);
			} finally {
				if (isMounted) setLoading(false);
			}
		};

		fetchRates();

		return () => {
			isMounted = false;
		};
	}, [baseCurrency, activeCurrency, interval]);

	const handleCurrencyChange = (currency) => {
		setActiveCurrency(currency);

		if (onCurrencyChange) {
			onCurrencyChange(currency);
		}
	};

	const handleIntervalChange = (selectedInterval) => {
		setInterval(selectedInterval);

		switch (selectedInterval) {
			case "1W":
				setMaxYTicks(8);
				break;
			case "1M":
			case "3M":
				setMaxYTicks(12);
				break;
			case "6M":
			case "1Y":
			default:
				setMaxYTicks(12);
				break;
		}
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		interaction: {
			mode: "index",
			intersect: false,
		},
		hover: {
			mode: "index",
			intersect: false,
		},
		layout: {
			padding: 0,
		},
		plugins: {
			tooltip: {
				enabled: true,
				mode: "index",
				intersect: false,
				displayColors: false,
				callbacks: {
					title: (tooltipItems) => {
						const item = tooltipItems[0];

						const date = new Date(item.label);

						return date.toLocaleDateString(undefined, {
							year: "numeric",
							month: "long",
							day: "2-digit",
						});
					},
					label: (context) => {
						let label = "";

						if (context.parsed.y !== null) {
							label += new Intl.NumberFormat("en-US", {
								minimumFractionDigits: 4,
								maximumFractionDigits: 4,
							}).format(context.parsed.y);
						}

						label += ` ${baseCurrency}`;

						return label;
					},
				},
			},
			legend: {
				display: false,
			},
			verticalLine: {
				enabled: true,
			},
		},
		scales: {
			x: {
				display: true,
				grid: {},
				ticks: {
					display: false,
					maxTicksLimit: maxYTicks,
				},
			},
			y: {
				display: true,
				beginAtZero: false,
				ticks: {
					callback: (value) => {
						return value.toFixed(4);
					},
				},
			},
		},
	};

	return (
		<>
			<div className={currencyTabStyles["currencyGraph"]} ref={graphContainerRef}>
				<h3 className={currencyTabStyles["graphHeading"]}>
					Currency Exchange (<span style={{ color: graphBorderColor }}>{activeCurrency}</span> to{" "}
					<span style={{ color: graphBorderColor }}>{baseCurrency}</span>)
				</h3>
				<div className={currencyTabStyles["currencyGraphContainer"]}>
					{!isLoading ? (
						<Line data={chartData} options={options} ref={graphRef} />
					) : (
						<>
							<div className={currencyTabStyles["loadingGraph"]}>Fetching data...</div>
						</>
					)}
				</div>
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
