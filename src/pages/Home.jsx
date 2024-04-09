import { useState } from "react";
import AddItemForm from "../components/AddItemForm";
import AssetListContainer from "../components/AssetListContainer";
import Balance from "../components/Balance";
import ExpenseTotal from "../components/ExpenseTotal";
import IncomeTotal from "../components/IncomeTotal";
import styles from "../styles/Dashboard.module.scss";
import { classNames } from "../utils/classNames";

export const Home = () => {
	const [activeTab, setActiveTab] = useState("Most Recent");

	const handleTabUpdate = (str) => {
		setActiveTab(str);
	};

	return (
		<>
			<section className={classNames(styles["container-section"])}>
				<h1>Dashboard</h1>
				<div className={styles["assets-row"]}>
					<div className={classNames([styles["asset-container"], styles["total"]])}>
						<Balance />
					</div>
					<div className={classNames([styles["asset-container"], styles["income"]])}>
						<IncomeTotal />
					</div>
					<div className={classNames([styles["asset-container"], styles["expenses"]])}>
						<ExpenseTotal />
					</div>
				</div>
			</section>
			<nav className={styles["container-nav"]}>
				<ul className={styles["nav-tabs"]}>
					<li
						className={classNames(styles["tab-item"], {
							[[styles["tab-active"]]]: activeTab === "Most Recent",
						})}
						onClick={() => handleTabUpdate("Most Recent")}
					>
						<span>Most Recent</span>
					</li>
					<li
						className={classNames(styles["tab-item"], {
							[[styles["tab-active"]]]: activeTab === "All",
						})}
						onClick={() => handleTabUpdate("All")}
					>
						<span>All</span>
					</li>
				</ul>
			</nav>
			{activeTab === "Most Recent" && (
				<>
					<section className={styles["container-section"]} id="income">
						<h3>Most Recent Income</h3>
						<AssetListContainer isShowRecent type="income" />
					</section>
					<section className={styles["container-section"]} id="expense">
						<h3>Most Recent Expenses</h3>
						<AssetListContainer isShowRecent type="expense" />
					</section>
				</>
			)}
			{activeTab === "All" && (
				<>
					<section className={styles["container-section"]}>
						<h3>All Transactions</h3>
						<AssetListContainer isShowRecent type="all" />
					</section>
				</>
			)}
			<section className={styles["container-section"]}>
				<h3>Add Item</h3>
				<AddItemForm />
			</section>
		</>
	);
};
