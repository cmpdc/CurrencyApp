import stylesListInner from "../styles/AssetListInner.module.scss";
import stylesListItem from "../styles/AssetListItem.module.scss";
import { classNames } from "../utils/classNames";
import { groupByCategoricalDate } from "../utils/dataFilter";
import { AssetListItem } from "./AssetListItem";

const AssetListInner = ({ assets, isShowRecent }) => {
	const groupDataByDate = groupByCategoricalDate(assets);

	const renderAssets = (itemData) => {
		return <AssetListItem key={itemData.id} data={itemData} isShowRecent={isShowRecent} />;
	};

	return isShowRecent ? (
		<ul className={stylesListInner["list-group"]}>
			<li className={classNames(stylesListItem["list-group-item"], stylesListItem["list-group-item-header"])}>
				<div className={classNames(stylesListItem["first-item"], stylesListItem["list-item"])}>Date</div>
				<div className={classNames(stylesListItem["second-item"], stylesListItem["list-item"])}>Name</div>
				<div className={classNames(stylesListItem["third-item"], stylesListItem["list-item"])}>Category</div>
				<div className={classNames(stylesListItem["fourth-item"], stylesListItem["list-item"])}>Cost</div>
			</li>
			{assets?.map((asset) => {
				return renderAssets(asset);
			})}
		</ul>
	) : (
		<>
			{Object.entries(groupDataByDate).map(([year, months]) => (
				<div key={year} id={`data-${year}`} className={stylesListInner["yearData"]}>
					<h3 className={stylesListInner["yearTitle"]}>
						<span>{year}</span>
					</h3>
					{Object.entries(months).map(([month, items]) => (
						<div key={month} id={`data-${month.replace(" ", "-").toLowerCase()}`} className={stylesListInner["monthData"]}>
							<h4 className={stylesListInner["monthTitle"]}>
								<span>{month}</span>
							</h4>
							<ul className={stylesListInner["list-group"]}>
								<li className={classNames(stylesListItem["list-group-item"], stylesListItem["list-group-item-header"])}>
									<div className={classNames(stylesListItem["first-item"], stylesListItem["list-item"])}>Date</div>
									<div className={classNames(stylesListItem["second-item"], stylesListItem["list-item"])}>Name</div>
									<div className={classNames(stylesListItem["third-item"], stylesListItem["list-item"])}>Category</div>
									<div className={classNames(stylesListItem["fourth-item"], stylesListItem["list-item"])}>Cost</div>
									<div className={classNames(stylesListItem["fifth-item"], stylesListItem["list-item"])}></div>
								</li>
								{items.map((item) => {
									return renderAssets(item);
								})}
							</ul>
						</div>
					))}
				</div>
			))}
		</>
	);
};

export default AssetListInner;
