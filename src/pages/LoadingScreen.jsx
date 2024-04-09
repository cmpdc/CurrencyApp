import styles from "../styles/LoadingScreen.module.scss";

export const LoadingScreen = ({ text }) => {
	return (
		<>
			<div className={styles["loadingScreen"]}>
				<div className={styles["icon"]}></div>
				<h3 className={styles["title"]}>
					<span>{!text ? "Loading. Please wait..." : text}</span>
				</h3>
			</div>
		</>
	);
};
