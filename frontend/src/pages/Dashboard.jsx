import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { NavigationBar } from "../components/NavigationBar";
import { useLoading } from "../context/LoadingContext";
import styles from "../styles/Dashboard.module.scss";
import { classNames } from "../utils/classNames";
import { DashboardHome } from "./DashboardHome";
import { LoadingScreen } from "./LoadingScreen";
import { NotFoundPage } from "./NotFound";
import { AccountTab } from "./tabs/AccountTab";
import { AssetsTab } from "./tabs/AssetsTab";
import { CurrencyTab } from "./tabs/CurrencyTab";
import { LogoutTab } from "./tabs/LogoutTab";

const timeoutInterval = 1200;

export const Dashboard = ({ type }) => {
	const { setIsLoading, isLoading } = useLoading();
	const location = useLocation();

	const renderType = (t) => {
		switch (t) {
			case "home":
				return <DashboardHome />;
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
				<div
					className={classNames(styles["container-inner"], {
						[[styles["loadingScreen"]]]: isLoading,
					})}
				>
					{isLoading ? location.pathname === "/logout" ? <LoadingScreen text={"Logging out..."} /> : <LoadingScreen /> : renderType(type)}
				</div>
			</div>
		</>
	);
};
