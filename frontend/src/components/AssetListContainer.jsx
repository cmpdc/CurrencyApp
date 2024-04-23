import { Input } from "@mui/joy";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { AppContext } from "../contexts/AppContext";
import { useModal } from "../contexts/ModalContext";
import { useTooltip } from "../contexts/TooltipContext";
import styles from "../styles/AssetListContainer.module.scss";
import { classNames } from "../utils/classNames";
import { recentCounter } from "../utils/constants";
import AddItemForm from "./AddItemForm";
import AssetListInner from "./AssetListInner";

const AssetListContainer = ({ type, isShowRecent, showTitle = false, customFilter, customTitle }) => {
	const { data } = useContext(AppContext);
	const { showModal } = useModal();
	const { showTooltip, hideTooltip } = useTooltip();

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
								showModal({
									content: <AddItemForm />,
								});
							}}
							onMouseEnter={() => {
								if (!addItemButtonRef.current) return;

								showTooltip({
									content: "Add Item",
									elementRef: addItemButtonRef,
								});

								addItemButtonRef.current.classList.add(styles["add-item-button-hover"]);
							}}
							onMouseLeave={() => {
								if (!addItemButtonRef.current) return;

								hideTooltip({
									elementRef: addItemButtonRef,
								});

								addItemButtonRef.current.classList.remove(styles["add-item-button-hover"]);
							}}
						>
							<FaPlus />
						</div>

						<div className={styles["searchBox"]}>
							<Input
								type="text"
								className={styles["form-control"]}
								placeholder="Type to search..."
								onChange={handleChange}
								size="sm"
								variant="outlined"
							/>
						</div>
					</div>
				)}
			</div>
			<AssetListInner assets={displayItems} isShowRecent={isShowRecent} type={type} />
		</>
	);
};

export default AssetListContainer;
