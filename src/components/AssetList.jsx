import styles from "../styles/AssetList.module.scss";
import { formatCost } from "../utils/formatCost";
import AssetItem from "./AssetItem";

const AssetListContainer = ({ assets, isShowRecent }) => {
	return (
		<ul className={styles["list-group"]}>
			{assets.map((asset) => (
				<AssetItem
					key={asset.id}
					id={asset.id}
					name={asset.name}
					cost={formatCost(asset.cost, asset.type)}
					type={asset.type}
					isShowRecent={isShowRecent}
				/>
			))}
		</ul>
	);
};

export default AssetListContainer;
