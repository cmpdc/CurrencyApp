import { useState } from "react";
import { MdKeyboardBackspace } from "react-icons/md";
import styles from "../styles/Dashboard.module.scss";
import { classNames } from "../utils/classNames";
import AssetListContainer from "./AssetListContainer";

const AssetListSingle = ({ type, onBack }) => {
	const [isHover, setHover] = useState(false);

	return (
		<>
			<div className={styles["backButton"]}>
				<span
					className={classNames(styles["icon"], {
						[styles["iconHovered"]]: isHover,
					})}
					onClick={onBack}
					onMouseEnter={() => setHover(true)}
					onMouseLeave={() => setHover(null)}
				>
					<MdKeyboardBackspace />
				</span>
				<span
					className={classNames(styles["text"], {
						[styles["iconHovered"]]: isHover,
					})}
					onClick={onBack}
					onMouseEnter={() => setHover(true)}
					onMouseLeave={() => setHover(null)}
				>
					Back
				</span>
			</div>
			<AssetListContainer isShowRecent={false} type={type} showTitle />
		</>
	);
};

export default AssetListSingle;
