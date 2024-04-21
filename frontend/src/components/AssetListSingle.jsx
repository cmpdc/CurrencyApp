import { useMemo, useState } from "react";
import { MdKeyboardBackspace } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../styles/Dashboard.module.scss";
import { classNames } from "../utils/classNames";
import AssetListContainer from "./AssetListContainer";

const AssetListSingle = ({ type, onBack }) => {
	const { categoryName } = useParams();
	const navigate = useNavigate();

	const [isHover, setHover] = useState(false);

	const filterFunction = useMemo(() => {
		return (data) => {
			if (categoryName) {
				return data.filter((item) => item.category === categoryName);
			}

			return data;
		};
	}, [type, categoryName]);

	const handleBack = onBack || (() => navigate("/assets"));

	return (
		<>
			<div className={styles["backButton"]}>
				<span
					className={classNames(styles["icon"], {
						[styles["iconHovered"]]: isHover,
					})}
					onClick={handleBack}
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
			{categoryName ? (
				<AssetListContainer type={"all"} isShowRecent={false} showTitle={false} customTitle={categoryName} customFilter={filterFunction} />
			) : (
				<AssetListContainer type={type} isShowRecent={false} showTitle={true} />
			)}
		</>
	);
};

export default AssetListSingle;
