import { useContext } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { AppContext } from "../context/AppContext";
import { useModal } from "../context/ModalContext";
import { useTooltip } from "../context/TooltipContext";
import styles from "../styles/AssetListItem.module.scss";
import { classNames } from "../utils/classNames";
import { formatAmount } from "../utils/formatAmount";
import AddItemForm from "./AddItemForm";

export const AssetListItem = ({ data, isShowRecent }) => {
	const { dispatch } = useContext(AppContext);
	const { showModal } = useModal();
	const { showTooltip, hideTooltip } = useTooltip();
	const { id, name, date, amount, category, type } = data;

	const formattedCost = formatAmount(amount, type);

	const handleDeleteItem = () => {
		dispatch({
			type: "DELETE_ITEM",
			payload: id,
		});
	};

	const handleUpdateItem = () => {
		showModal(<AddItemForm props={data} />);
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
					onMouseEnter={(e) => {
						showTooltip(dateFormatDetailed, e.target);
					}}
					onMouseLeave={hideTooltip}
				>
					{dateFormatShort}
				</time>
			</div>
			<div className={classNames(styles["second-item"], styles["list-item"])}>
				<span className={styles["name"]}>{name}</span>
			</div>
			<div className={classNames(styles["third-item"], styles["list-item"])}>
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
			{!isShowRecent && (
				<div className={classNames(styles["fifth-item"], styles["list-item"])}>
					<div className={styles["buttons"]}>
						<span
							className={styles["button"]}
							onClick={handleDeleteItem}
							onMouseEnter={(e) => {
								e.preventDefault();

								showTooltip("Delete", e.target);
							}}
							onMouseLeave={(e) => {
								e.preventDefault();

								hideTooltip();
							}}
						>
							<FaTrash size="1.5em" />
						</span>
						<span
							className={styles["button"]}
							onClick={handleUpdateItem}
							onMouseEnter={(e) => {
								e.preventDefault();

								showTooltip("Edit", e.target);
							}}
							onMouseLeave={(e) => {
								e.preventDefault();

								hideTooltip();
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
