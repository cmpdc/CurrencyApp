import styles from "../styles/AssetListInner.module.scss";
import { formatCost } from "../utils/formatCost";
import AssetItem from "./AssetItem";

const AssetListInner = ({ assets, isShowRecent }) => {
	return (
		<ul className={styles["list-group"]}>
			{assets?.map((asset) => (
				<AssetItem
					key={asset.id}
					id={asset.id}
					date={asset.date}
					name={asset.name}
					cost={formatCost(asset.cost, asset.type)}
					category={asset.category}
					type={asset.type}
					isShowRecent={isShowRecent}
				/>
			))}
		</ul>
	);
};

export default AssetListInner;
