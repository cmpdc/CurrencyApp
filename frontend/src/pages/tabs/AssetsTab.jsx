import { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AddItemForm from "../../components/AddItemForm";
import { AssetHeader } from "../../components/AssetHeader";
import AssetListContainer from "../../components/AssetListContainer";
import { AssetListNoItem } from "../../components/AssetListNoItem";
import AssetListSingle from "../../components/AssetListSingle";
import { AppContext } from "../../contexts/AppContext";
import { useModal } from "../../contexts/ModalContext";
import styles from "../../styles/Dashboard.module.scss";
import { classNames } from "../../utils/classNames";

export const AssetsTab = () => {
	const { data } = useContext(AppContext);
	const location = useLocation();
	const navigate = useNavigate();
	const { showModal } = useModal();

	const addItemButtonRef = useRef();

	const [incomeItems, setIncomeItems] = useState([]);
	const [expenseItems, setExpenseItems] = useState([]);

	const [activeNavTab, setNavActiveTab] = useState("Most Recent");
	const [hoverNavTab, setNavHoverTab] = useState(null);
	const [viewTypeTab, setTypeTab] = useState(null);

	useEffect(() => {
		const path = location.pathname.split("/").pop();
		setTypeTab(path === "assets" ? null : path);
	}, [location]);

	useEffect(() => {
		const income = data.filter((item) => item.type === "income");
		const expenses = data.filter((item) => item.type === "expense");

		setIncomeItems(income);
		setExpenseItems(expenses);
	}, [data]);

	const handleNavTabUpdate = (str) => {
		setNavActiveTab(str);
	};

	const navigateView = (type) => {
		navigate(type ? `/assets/${type}` : "/assets");
	};

	return (
		<>
			<section className={classNames(styles["container-section"])}>
				<h1>My Assets</h1>
			</section>
			{viewTypeTab ? (
				<AssetListSingle type={viewTypeTab} onBack={() => navigateView(null)} />
			) : (
				<>
					<AssetHeader />
					<nav className={classNames(styles["container-nav"], styles["container-nav-row"])}>
						<div className={styles["container-right"]}>
							<ul className={styles["nav-tabs"]}>
								{["Most Recent", "All"].map((tab, tabIndex) => (
									<li
										key={tabIndex}
										className={classNames(styles["tab-item"], {
											[styles["tab-active"]]: activeNavTab === tab,
											[styles["tab-hover"]]: hoverNavTab === tab,
										})}
										onClick={() => handleNavTabUpdate(tab)}
										onMouseEnter={() => setNavHoverTab(tab)}
										onMouseLeave={() => setNavHoverTab(null)}
									>
										<span>{tab}</span>
									</li>
								))}
							</ul>
						</div>
						<div
							className={styles["add-item-button"]}
							ref={addItemButtonRef}
							onClick={() => {
								showModal({
									content: <AddItemForm />,
								});
							}}
							onMouseEnter={(e) => {
								if (!addItemButtonRef.current) return;

								addItemButtonRef.current.classList.add(styles["add-item-button-hover"]);
							}}
							onMouseLeave={(e) => {
								if (!addItemButtonRef.current) return;

								addItemButtonRef.current.classList.remove(styles["add-item-button-hover"]);
							}}
						>
							Add Item
						</div>
					</nav>
					{activeNavTab === "Most Recent" && (
						<>
							<section className={styles["container-section"]} id="income">
								<h3>Most Recent Income</h3>
								{incomeItems.length > 0 ? (
									<>
										<AssetListContainer isShowRecent type="income" />
										<div className={styles["view-all-button"]}>
											<span onClick={() => navigateView("income")}>View All</span>
										</div>
									</>
								) : (
									<AssetListNoItem message={"No income data added"} />
								)}
							</section>
							<section className={styles["container-section"]} id="expense">
								<h3>Most Recent Expenses</h3>
								{expenseItems.length > 0 ? (
									<>
										<AssetListContainer isShowRecent type="expense" />
										<div className={styles["view-all-button"]}>
											<span onClick={() => navigateView("expense")}>View All</span>
										</div>
									</>
								) : (
									<AssetListNoItem message={"No expense data added"} />
								)}
							</section>
						</>
					)}
					{activeNavTab === "All" && (
						<>
							<section className={styles["container-section"]}>
								<h3>All Transactions</h3>
								<AssetListContainer isShowRecent type="all" />
								<div className={styles["view-all-button"]}>
									<span onClick={() => navigateView("all")}>View All</span>
								</div>
							</section>
						</>
					)}
				</>
			)}
		</>
	);
};
