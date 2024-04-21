import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { AppContext } from "../context/AppContext";
import { useModal } from "../context/ModalContext";
import styles from "../styles/AssetListContainer.module.scss";
import { classNames } from "../utils/classNames";
import { recentCounter } from "../utils/constants";
import AddItemForm from "./AddItemForm";
import AssetListInner from "./AssetListInner";

const AssetListContainer = ({ type, isShowRecent, showTitle = false, customFilter, customTitle }) => {
	const { data } = useContext(AppContext);
	const { showModal } = useModal();

	const addItemButtonRef = useRef();

	const filteredItems = useMemo(() => {
		let items = customFilter ? customFilter(data) : type !== "all" ? data.filter((item) => item.type === type) : data;
		items.sort((a, b) => {
			const dateA = new Date(a.date);
			const dateB = new Date(b.date);
			return dateB - dateA; // Descending order
		});

		return items;
	}, [data, type, customFilter]);

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
					[[styles["hasTitle"]]]: showTitle || customTitle,
				})}
			>
				{customTitle && <span className={styles["typeTitle"]}>Category: {customTitle}</span>}
				{!customTitle && showTitle && <span className={styles["typeTitle"]}>{String(type).toUpperCase()}</span>}
				{!isShowRecent && (
					<div className={styles["rightSide"]}>
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
							<FaPlus />
						</div>

						<div className={styles["searchBox"]}>
							<input type="text" className={styles["form-control"]} placeholder="Type to search..." onChange={handleChange} />
						</div>
					</div>
				)}
			</div>
			<AssetListInner assets={displayItems} isShowRecent={isShowRecent} />
		</>
	);
};

export default AssetListContainer;
