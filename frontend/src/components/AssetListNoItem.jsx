import styles from "../styles/AssetListNoItem.module.scss";

export const AssetListNoItem = ({ message }) => {
	return (
		<div className={styles["no-item"]}>
			<span>{message}</span>
		</div>
	);
};
