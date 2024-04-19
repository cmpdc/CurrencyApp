import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const navigate = useNavigate();

	useEffect(() => {
		navigate("/login");
	}, [navigate]);

	return (
		<>
			<span>Home</span>
		</>
	);
};

export default Home;
