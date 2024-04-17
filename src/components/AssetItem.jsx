import { useContext } from "react";
import { TiDelete } from "react-icons/ti";
import { AppContext } from "../context/AppContext";
import styles from "../styles/AssetItem.module.scss";
import { classNames } from "../utils/classNames";

const AssetItem = ({ id, name, date, cost, category, type, isShowRecent }) => {
	const { dispatch } = useContext(AppContext);

	const handleDeleteItem = () => {
		dispatch({
			type: "DELETE_ITEM",
			payload: id,
		});
	};

	const itemDate = new Date(date);

	const formattedDate = itemDate.toLocaleString("en-US", {
		weekday: "long", // long weekday
		year: "numeric", // numeric year
		month: "long", // long month
		day: "numeric", // numeric day
		hour: "2-digit", // 2-digit hour
		minute: "2-digit", // 2-digit minute
		hour12: true, // use 12-hour time
	});

	const dateFormat = `${formattedDate.split(",").join("")}`;

	return (
		<li className={styles["list-group-item"]}>
			<div className={classNames(styles["first-item"], styles["list-item"])}>
				<time>{dateFormat}</time>
			</div>
			<div className={classNames(styles["second-item"], styles["list-item"])}>
				<span className={styles["name"]}>{name}</span>
				{category && <span className={styles["category"]}>{category}</span>}
			</div>
			<div className={classNames(styles["third-item"], styles["list-item"])}>
				<span className={styles["list-inner"]}>
					<span
						className={classNames(styles["badge"], {
							[[styles["badge-income"]]]: type === "income",
							[[styles["badge-expense"]]]: type === "expense",
							[[styles["badge-hasButton"]]]: !isShowRecent,
						})}
					>
						{cost}
					</span>
					{!isShowRecent && <TiDelete size="1.5em" onClick={handleDeleteItem} className={styles["button"]} />}
				</span>
			</div>
		</li>
	);
};

export default AssetItem;
