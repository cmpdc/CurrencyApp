import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
	const navigate = useNavigate();
	const { isAuthenticated } = useAuth();

	useEffect(() => {
		if (isAuthenticated !== null) {
			navigate(isAuthenticated ? "/dashboard" : "/login");
		}
	}, [navigate, isAuthenticated]);

	return (
		<>
			<span>Home</span>
		</>
	);
};

export default Home;
