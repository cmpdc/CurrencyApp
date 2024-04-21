import { useEffect } from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { LoadingProvider } from "./context/LoadingContext";
import { Dashboard } from "./pages/Dashboard";
import Home from "./pages/Home";
import LoginRegister from "./pages/LoginRegister";
import { NotFoundPage } from "./pages/NotFound";
import { AssetsTab } from "./pages/tabs/AssetsTab";
import { SELECTED_BASE_CURRENCY_KEY } from "./utils/constants";

const App = () => {
	const { isAuthenticated } = useAuth();

	const router = createBrowserRouter([
		{
			path: "/",
			element: <Home />,
		},
		{
			path: "/login",
			element: <LoginRegister type={"login"} />,
		},
		{
			path: "/register",
			element: <LoginRegister type={"register"} />,
		},
		{
			path: "/dashboard",
			element: isAuthenticated ? <Dashboard type={"home"} /> : <Navigate to={"/login"} />,
		},
		{
			path: "/currency",
			element: isAuthenticated ? <Dashboard type={"currency"} /> : <Navigate to={"/login"} />,
		},
		{
			path: "/assets",
			element: isAuthenticated ? <Dashboard type={"assets"} /> : <Navigate to={"/login"} />,
			children: [
				{ path: "income", element: <AssetsTab /> },
				{ path: "expense", element: <AssetsTab /> },
				{ path: "all", element: <AssetsTab /> },
			],
		},
		{
			path: "/logout",
			element: isAuthenticated ? <Dashboard type={"logout"} /> : <Navigate to={"/login"} />,
		},
		{
			path: "*",
			element: <NotFoundPage />,
		},
	]);

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
