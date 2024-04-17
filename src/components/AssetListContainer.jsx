import { useContext, useEffect, useMemo, useState } from "react";
import { AppContext } from "../context/AppContext";
import styles from "../styles/AssetListContainer.module.scss";
import { classNames } from "../utils/classNames";
import { recentCounter } from "../utils/constants";
import AssetListInner from "./AssetListInner";

const AssetListContainer = ({ type, isShowRecent, showTitle = false }) => {
	const { data } = useContext(AppContext);

	const filteredItems = useMemo(() => {
		let items = type !== "all" ? data.filter((item) => item.type === type) : data;
		items.sort((a, b) => {
			const dateA = new Date(a.date);
			const dateB = new Date(b.date);
			return dateB - dateA; // Descending order
		});

		return items;
	}, [data, type]);

	const [displayItems, setDisplayItems] = useState(filteredItems);

	useEffect(() => {
		setDisplayItems(type !== "all" && isShowRecent ? filteredItems.slice(-recentCounter) : filteredItems);
	}, [data, isShowRecent, type, filteredItems]);

	const handleChange = (event) => {
		const searchResults = filteredItems.filter((item) => item.name.toLowerCase().includes(event.target.value.toLowerCase()));
		setDisplayItems(searchResults);
	};

	return (
		<>
			<div
				className={classNames(styles["header"], {
					[[styles["hasTitle"]]]: showTitle,
				})}
			>
				{showTitle && <span className={styles["typeTitle"]}>{String(type).toUpperCase()}</span>}
				{type !== "all" && !isShowRecent && (
					<input type="text" className={styles["form-control"]} placeholder="Type to search..." onChange={handleChange} />
				)}
			</div>
			<AssetListInner assets={displayItems} isShowRecent={isShowRecent} />
		</>
	);
};

export default AssetListContainer;
