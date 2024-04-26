import { Button } from "@mui/joy";
import { useContext, useRef } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import { useModal } from "../contexts/ModalContext";
import { useTooltip } from "../contexts/TooltipContext";
import styles from "../styles/AssetListItem.module.scss";
import { classNames } from "../utils/classNames";
import { formatAmount } from "../utils/formatAmount";
import { getOrSetDefaultBaseCurrency } from "../utils/getOrSetDefaultBaseCurrency";
import AddItemForm from "./AddItemForm";

export const AssetListItem = ({ data, isShowRecent }) => {
	const { id, name, date, amount, currency, category, type } = data;

	const { dispatch } = useContext(AppContext);
	const { showModal } = useModal();
	const { showTooltip, hideTooltip } = useTooltip();
	const navigate = useNavigate();

	const baseCurrency = getOrSetDefaultBaseCurrency();

	const timeRef = useRef();
	const deleteButtonRef = useRef();
	const editButtonRef = useRef();

	const formattedCost = formatAmount({ amount: amount, type: type, currency: null });

	const handleViewItem = () => {
		const renderElem = () => {
			return (
				<div className={styles["viewModal"]}>
					<div className={styles["view-item"]}>
						<h3 style={{ margin: "0px" }}>{name}</h3>
					</div>
					<div className={styles["view-item"]}>
						<div>Date</div>
						<span>{formattedDateDetailed}</span>
					</div>
					<div className={styles["view-item"]}>
						<div>Category</div>
						<span>{category}</span>
					</div>
					<div className={classNames(styles["view-item"])}>
						<div>Amount</div>
						<div>
							<span
								className={classNames(styles["badge"], {
									[[styles["badge-income"]]]: type === "income",
									[[styles["badge-expense"]]]: type === "expense",
									[[styles["badge-hasButton"]]]: !isShowRecent,
								})}
							>
								{formattedCost}
							</span>
						</div>
					</div>
					<div className={styles["view-item"]}>
						<span>Currency</span>
						<span>{currency}</span>
					</div>
					<div
						className={styles["view-item"]}
						style={{
							margin: "20px 0 0 0",
							alignContent: "center",
							justifyContent: "center",
						}}
					>
						<Button size="sm" variant="outlined">
							Close
						</Button>
					</div>
				</div>
			);
		};

		showModal({
			content: renderElem(),
		});
	};

	const handleDeleteItem = () => {
		dispatch({
			type: "DELETE_ITEM",
			payload: id,
		});
	};

	const handleUpdateItem = () => {
		showModal({
			content: <AddItemForm props={data} />,
		});
	};

	const itemDate = new Date(date);

	const formattedDateShort = itemDate.toLocaleString("en-US", {
		weekday: "long", // long weekday
		year: "numeric", // numeric year
		month: "long", // long month
		day: "2-digit", // numeric day
	});

	const dateFormatShort = `${formattedDateShort}`;

	const formattedDateDetailed = itemDate.toLocaleString("en-US", {
		weekday: "long", // long weekday
		year: "numeric", // numeric year
		month: "long", // long month
		day: "2-digit", // numeric day
		hour: "2-digit", // 2-digit hour
		minute: "2-digit", // 2-digit minute
		hour12: true, // use 12-hour time
	});

	const dateFormatDetailed = `${formattedDateDetailed}`;

	return (
		<li className={styles["list-group-item"]}>
			<div className={classNames(styles["first-item"], styles["list-item"])}>
				<time
					ref={timeRef}
					onMouseEnter={(e) => {
						showTooltip({
							content: dateFormatDetailed,
							elementRef: timeRef,
							placement: "top",
						});
					}}
					onMouseLeave={hideTooltip}
				>
					{dateFormatShort}
				</time>
			</div>
			<div className={classNames(styles["second-item"], styles["list-item"], styles["clickable-item"])}>
				<span className={styles["name"]} onClick={handleViewItem}>
					{name}
				</span>
			</div>
			<div
				className={classNames(styles["third-item"], styles["list-item"])}
				onClick={() => {
					navigate(`/assets/category/${category}`);
				}}
			>
				{category && <span className={styles["category"]}>{category}</span>}
			</div>
			<div className={classNames(styles["fourth-item"], styles["list-item"])}>
				<span
					className={classNames(styles["badge"], {
						[[styles["badge-income"]]]: type === "income",
						[[styles["badge-expense"]]]: type === "expense",
						[[styles["badge-hasButton"]]]: !isShowRecent,
					})}
				>
					{formattedCost}
				</span>
			</div>
			<div className={classNames(styles["fifth-item"], styles["list-item"])}>
				<span>{currency}</span>
			</div>
			{!isShowRecent && (
				<div className={classNames(styles["fifth-item"], styles["list-item"])}>
					<div className={styles["buttons"]}>
						<span
							ref={deleteButtonRef}
							className={styles["button"]}
							onClick={handleDeleteItem}
							onMouseEnter={(e) => {
								e.preventDefault();

								showTooltip({
									content: "Delete",
									elementRef: deleteButtonRef,
									placement: "top",
								});
							}}
							onMouseLeave={(e) => {
								e.preventDefault();

								hideTooltip({ deleteButtonRef });
							}}
						>
							<FaTrash size="1.5em" />
						</span>
						<span
							ref={editButtonRef}
							className={styles["button"]}
							onClick={handleUpdateItem}
							onMouseEnter={(e) => {
								e.preventDefault();

								showTooltip({
									content: "Edit",
									elementRef: editButtonRef,
									placement: "top",
								});
							}}
							onMouseLeave={(e) => {
								e.preventDefault();

								hideTooltip({ editButtonRef });
							}}
						>
							<FaPencilAlt size="1.5em" />
						</span>
					</div>
				</div>
			)}
		</li>
	);
};
