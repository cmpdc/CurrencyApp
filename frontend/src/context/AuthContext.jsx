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
					const response = await fetch(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/api/token`, {
						headers: { Authorization: `Bearer ${token}` },
					});

					if (response.ok) {
						setIsAuthenticated(response.ok);
					} else {
						console.log(response.text);
					}
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
