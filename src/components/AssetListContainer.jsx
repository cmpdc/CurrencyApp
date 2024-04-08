import { useContext, useEffect, useMemo, useState } from "react";
import { AppContext } from "../context/AppContext";
import { recentCounter } from "../utils/constants";
import AssetListInner from "./AssetListInner";

const AssetListContainer = ({ type, isShowRecent }) => {
	const { data } = useContext(AppContext);

	const filteredItems = useMemo(() => {
		return type !== "all" ? data.filter((item) => item.type === type) : data;
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
			{type !== "all" && !isShowRecent && (
				<input type="text" className="form-control mb-2 mr-sm-2" placeholder="Type to search..." onChange={handleChange} />
			)}
			<AssetListInner assets={displayItems} isShowRecent={isShowRecent} />
		</>
	);
};

export default AssetListContainer;
