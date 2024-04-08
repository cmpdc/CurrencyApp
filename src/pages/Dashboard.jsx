import { NavigationBar } from "../components/NavigationBar";
import styles from "../styles/Dashboard.module.scss";
import { Home } from "./Home";
import { NotFoundPage } from "./NotFound";
import { AccountTab } from "./tabs/AccountTab";
import { AssetsTab } from "./tabs/AssetsTab";
import { CurrencyTab } from "./tabs/CurrencyTab";

export const Dashboard = ({ type }) => {
	const renderType = (t) => {
		switch (t) {
			case "home":
				return <Home />;
			case "currency":
				return <CurrencyTab />;
			case "assets":
				return <AssetsTab />;
			case "account":
				return <AccountTab />;
			default:
				return <NotFoundPage />;
		}
	};

	return (
		<>
			<NavigationBar />
			<div className={styles["container"]}>{renderType(type)}</div>
		</>
	);
};
