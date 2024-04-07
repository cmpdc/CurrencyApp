import { useContext } from "react";
import { TiDelete } from "react-icons/ti";
import { AppContext } from "../context/AppContext";
import styles from "../styles/AssetItem.module.scss";
import { classNames } from "../utils/classNames";

const AssetItem = ({ id, name, cost, type, isShowRecent }) => {
	const { dispatch } = useContext(AppContext);

	const handleDeleteItem = () => {
		dispatch({
			type: "DELETE_ITEM",
			payload: id,
		});
	};

	return (
		<li className={styles["list-group-item"]}>
			{name}
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
		</li>
	);
};

export default AssetItem;
