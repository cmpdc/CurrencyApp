import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { NavigationBar } from "../components/NavigationBar";
import { useLoading } from "../context/LoadingContext";
import styles from "../styles/Dashboard.module.scss";
import { Home } from "./Home";
import { LoadingScreen } from "./LoadingScreen";
import { NotFoundPage } from "./NotFound";
import { AccountTab } from "./tabs/AccountTab";
import { AssetsTab } from "./tabs/AssetsTab";
import { CurrencyTab } from "./tabs/CurrencyTab";
import { LogoutTab } from "./tabs/LogoutTab";

const timeoutInterval = 1500;

export const Dashboard = ({ type }) => {
	const { setIsLoading, isLoading } = useLoading();
	const location = useLocation();

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
			case "logout":
				return <LogoutTab />;
			default:
				return <NotFoundPage />;
		}
	};

	useEffect(() => {
		setIsLoading(true);

		setTimeout(() => {
			setIsLoading(false);
		}, timeoutInterval);
	}, [location.pathname]);

	return (
		<>
			<NavigationBar />
			<div className={styles["container"]}>
				{isLoading ? (
					<>
						<LoadingScreen />
					</>
				) : (
					<>{renderType(type)}</>
				)}
			</div>
		</>
	);
};
