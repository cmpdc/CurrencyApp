import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import styles from "../../styles/Dashboard.module.scss";
import { classNames } from "../../utils/classNames";

export const LogoutTab = () => {
	const navigate = useNavigate();
	const { setIsAuthenticated } = useAuth();

	useEffect(() => {
		localStorage.removeItem("token");
		setIsAuthenticated(false);
		navigate("/");
	}, [navigate, setIsAuthenticated]);

	return (
		<>
			<section className={classNames(styles["container-section"])}>
				<h1>Logout</h1>
			</section>
		</>
	);
};
