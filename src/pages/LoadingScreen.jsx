import styles from "../styles/LoadingScreen.module.scss";

export const LoadingScreen = ({ text }) => {
	return (
		<>
			<div className={styles["loadingScreen"]}>
				<div className="icon"></div>
				<h3 className={styles["title"]}>{text ? text : <span>Loading. Please wait...</span>}</h3>
			</div>
		</>
	);
};
