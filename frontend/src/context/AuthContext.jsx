import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		const checkAuth = async () => {
			const token = localStorage.getItem("token");
			if (!token) {
				setIsAuthenticated(false);
			} else {
				try {
					const response = await fetch("/api/token", {
						headers: { Authorization: `Bearer ${token}` },
					});
					setIsAuthenticated(response.ok);
				} catch (error) {
					console.error("Token validation error:", error);
					setIsAuthenticated(false);
				}
			}
		};

		checkAuth();
	}, []);

	return <AuthContext.Provider value={{ isAuthenticated }}>{children}</AuthContext.Provider>;
};
