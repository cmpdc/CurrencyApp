import { useEffect } from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { isAuthenticated } from "./auth/isAuthenticated";
import { LoadingProvider } from "./context/LoadingContext";
import { Dashboard } from "./pages/Dashboard";
import { NotFoundPage } from "./pages/NotFound";
import { AssetsTab } from "./pages/tabs/AssetsTab";
import { SELECTED_BASE_CURRENCY_KEY } from "./utils/constants";

const router = createBrowserRouter([
	{
		path: "/",
		element: isAuthenticated() ? <Navigate to="/dashboard" /> : <Navigate to="/account" />,
	},
	{
		path: "/dashboard",
		element: isAuthenticated() ? <Dashboard type={"home"} /> : <Navigate to={"/account"} />,
	},
	{
		path: "/currency",
		element: isAuthenticated() ? <Dashboard type={"currency"} /> : <Navigate to={"/account"} />,
	},
	{
		path: "/assets",
		element: isAuthenticated() ? <Dashboard type={"assets"} /> : <Navigate to={"/account"} />,
		children: [
			{ path: "income", element: <AssetsTab listType={"income"} /> },
			{ path: "expense", element: <AssetsTab listType={"expense"} /> },
			{ path: "all", element: <AssetsTab listType={"all"} /> },
		],
	},
	{
		path: "/account",
		element: isAuthenticated() ? <Dashboard type={"account"} /> : <Navigate to={"/account"} />,
	},
	{
		path: "/logout",
		element: isAuthenticated() ? <Dashboard type={"logout"} /> : <Navigate to={"/account"} />,
	},
	{
		path: "*",
		element: <NotFoundPage />,
	},
]);

const App = () => {
	useEffect(() => {
		const initializeCurrency = async () => {
			let currency = localStorage.getItem(SELECTED_BASE_CURRENCY_KEY);

			if (!currency) {
				localStorage.setItem(SELECTED_BASE_CURRENCY_KEY, JSON.stringify("USD"));
			}
		};

		initializeCurrency();
	}, []);

	return (
		<LoadingProvider>
			<RouterProvider router={router} />
		</LoadingProvider>
	);
};

export default App;
