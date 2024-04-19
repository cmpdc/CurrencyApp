import { useEffect, useRef, useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import styles from "../styles/LoginRegister.module.scss";

const LoginRegister = ({ type }) => {
	const navigate = useNavigate();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [notification, setNotification] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const usernameInputRef = useRef(null);
	const passwordInputRef = useRef(null);
	const secondButtonTextRef = useRef(null);

	const isLogin = type === "login";
	const apiUrl = `http://localhost:${import.meta.env.VITE_BACKEND_PORT}/api/${type}`;
	const navigateTo = isLogin ? "/dashboard" : "/login";
	const buttonText = isLogin ? "Login" : "Register";

	useEffect(() => {
		secondButtonTextRef.current.textContent = type === "login" ? "register" : "login";
	}, [secondButtonTextRef]);

	const handleSubmit = async (event) => {
		event.preventDefault();
		const response = await fetch(apiUrl, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ username, password }),
		});

		if (response.ok) {
			if (isLogin) {
				const { token } = await response.json();
				localStorage.setItem("token", token);
			}
			navigate(navigateTo);
		} else {
			const errorText = await response.text();
			setNotification(errorText);
		}
	};

	const handleSecondClick = () => {};

	const handleUsernameChange = (e) => {
		setUsername(e.target.value);
		setNotification("");
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
		setNotification("");
	};

	const handleShowPasswordChange = () => {
		setShowPassword(!showPassword);
	};

	const handleUsernameFocus = () => {};

	const handleUsernameBlur = () => {};

	return (
		<div className={styles["loginPage"]}>
			<div className={styles["loginContainer"]}>
				<h1 className={styles["headerTitle"]}>{type === "register" ? "Create an Account" : "Login"}</h1>
				<div className={styles["inputForms"]}>
					<div className={styles["inputGroup"]}>
						<span className={styles["name"]}>Username</span>
						<input
							ref={usernameInputRef}
							className={styles["input"]}
							type="username"
							id="loginEmail"
							value={username}
							onChange={handleUsernameChange}
							onFocus={handleUsernameFocus}
							onBlur={handleUsernameBlur}
							required
						/>
					</div>
					<div className={styles["inputGroup"]}>
						<span className={styles["name"]}>Password</span>
						<input
							ref={passwordInputRef}
							className={styles["input"]}
							type={showPassword ? "text" : "password"}
							id="loginPassword"
							value={password}
							onChange={handlePasswordChange}
							required
						/>
						<div className={styles["icon"]} onClick={handleShowPasswordChange}>
							{showPassword ? <HiEye /> : <HiEyeOff />}
						</div>
					</div>
				</div>
				{notification !== "" && (
					<>
						<div className={styles["notification"]}>
							<span className={styles["notificationType"]}>{String(type).toUpperCase()}:</span>
							<span className={styles["notificationText"]}>{notification}</span>
						</div>
					</>
				)}
				<div className={styles["inputGroup"]}>
					<div type="submit" onClick={handleSubmit} className={styles["button"]} tabIndex={0}>
						<span>{buttonText}</span>
					</div>
					<div onClick={handleSecondClick} className={styles["button"]} tabIndex={0} style={{ marginLeft: "5px" }}>
						<span ref={secondButtonTextRef} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginRegister;
