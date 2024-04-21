import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		const validateToken = async () => {
			const token = localStorage.getItem("token");
			if (!token) {
				setIsAuthenticated(false);
				return;
			}

			try {
				const response = await fetch(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/api/token`, {
					headers: { Authorization: `Bearer ${token}` },
				});

				if (response.ok) {
					setIsAuthenticated(true);
				} else {
					setIsAuthenticated(false);
					localStorage.removeItem("token");
				}
			} catch (error) {
				console.error("Network or server error:", error);
				setIsAuthenticated(false);
			}
		};

		validateToken();
	}, []);

	return <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>{children}</AuthContext.Provider>;
};
