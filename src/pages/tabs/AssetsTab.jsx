import { useRef, useState } from "react";
import AddItemForm from "../../components/AddItemForm";
import AssetListContainer from "../../components/AssetListContainer";
import AssetListSingle from "../../components/AssetListSingle";
import { useModal } from "../../context/ModalContext";
import styles from "../../styles/Dashboard.module.scss";
import { classNames } from "../../utils/classNames";

export const AssetsTab = () => {
	const [activeTab, setActiveTab] = useState("Most Recent");
	const [hoverTab, setHoverTab] = useState(null);
	const [viewAllType, setViewAllType] = useState(null);

	const { showModal } = useModal();

	const addItemButtonRef = useRef();

	const handleTabUpdate = (str) => {
		setActiveTab(str);
	};

	const handleViewAll = (type) => {
		setViewAllType(type);
	};

	return (
		<>
			<section className={classNames(styles["container-section"])}>
				<h1>My Assets</h1>
			</section>
			{viewAllType ? (
				<AssetListSingle type={viewAllType} onBack={() => setViewAllType(null)} />
			) : (
				<>
					<nav className={classNames(styles["container-nav"], styles["container-nav-row"])}>
						<ul className={styles["nav-tabs"]}>
							{["Most Recent", "All"].map((tab, tabIndex) => (
								<li
									key={tabIndex}
									className={classNames(styles["tab-item"], {
										[styles["tab-active"]]: activeTab === tab,
										[styles["tab-hover"]]: hoverTab === tab,
									})}
									onClick={() => handleTabUpdate(tab)}
									onMouseEnter={() => setHoverTab(tab)}
									onMouseLeave={() => setHoverTab(null)}
								>
									<span>{tab}</span>
								</li>
							))}
						</ul>
						<div
							className={styles["add-item-button"]}
							ref={addItemButtonRef}
							onClick={() => {
								showModal(<AddItemForm />);
							}}
							onMouseEnter={() => {
								if (!addItemButtonRef.current) return;

								addItemButtonRef.current.classList.add(styles["add-item-button-hover"]);
							}}
							onMouseLeave={() => {
								if (!addItemButtonRef.current) return;

								addItemButtonRef.current.classList.remove(styles["add-item-button-hover"]);
							}}
						>
							Add Item
						</div>
					</nav>
					{activeTab === "Most Recent" && (
						<>
							<section className={styles["container-section"]} id="income">
								<h3>Most Recent Income</h3>
								<AssetListContainer isShowRecent type="income" />
								<div className={styles["view-all-button"]}>
									<span onClick={() => handleViewAll("income")}>View All</span>
								</div>
							</section>
							<section className={styles["container-section"]} id="expense">
								<h3>Most Recent Expenses</h3>
								<AssetListContainer isShowRecent type="expense" />
								<div className={styles["view-all-button"]}>
									<span onClick={() => handleViewAll("expense")}>View All</span>
								</div>
							</section>
						</>
					)}
					{activeTab === "All" && (
						<>
							<section className={styles["container-section"]}>
								<h3>All Transactions</h3>
								<AssetListContainer isShowRecent type="all" />
								<div className={styles["view-all-button"]}>
									<span onClick={() => handleViewAll("all")}>View All</span>
								</div>
							</section>
						</>
					)}
				</>
			)}
		</>
	);
};
