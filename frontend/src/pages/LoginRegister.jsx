import { useEffect, useRef, useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import styles from "../styles/LoginRegister.module.scss";
import { classNames } from "../utils/classNames";
import { notifyOptions } from "../utils/notifyOptions";

const LoginRegister = ({ type }) => {
	const navigate = useNavigate();
	const { notify } = useToast();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const usernameInputRef = useRef(null);
	const passwordInputRef = useRef(null);
	const secondButtonTextRef = useRef(null);

	const isLogin = type === "login";
	const apiUrl = `http://localhost:${import.meta.env.VITE_BACKEND_PORT}/api/${type}`;
	const navigateTo = isLogin ? "/dashboard" : "/login";

	const headerText = isLogin ? "Login to account" : "Create an account";

	const primaryButtonText = isLogin ? "Login" : "Register";
	const createAccText = "Create an Account";

	const loginText = type === "login" ? "Username" : "Create Username";
	const passwordText = type === "login" ? "Register" : "Create Password";

	const loginContainerWidth = type === "login" ? `420px` : `500px`;

	useEffect(() => {
		secondButtonTextRef.current.textContent = type === "login" ? createAccText : "login";
	}, [secondButtonTextRef, type]);

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (username === "" || password === "") {
			notify("Enter username or password.", notifyOptions);
			return;
		}

		const response = await fetch(apiUrl, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ username, password }),
		});

		if (response.ok) {
			if (isLogin) {
				const { token } = await response.json();
				localStorage.setItem("token", token);
			} else {
				const responseText = await response.text();
				notify(responseText, notifyOptions);
			}

			navigate(navigateTo);
		} else {
			const responseText = await response.text();
			notify(responseText, notifyOptions);
		}

		setUsername("");
		setPassword("");
	};

	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			handleSubmit(event);
		}
	};

	const handleSecondButtonClick = () => {
		navigate(type === "login" ? "/register" : "/login");
	};

	const handleUsernameChange = (e) => {
		setUsername(e.target.value);
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const handleShowPasswordChange = () => {
		setShowPassword(!showPassword);
	};

	const handleUsernameFocus = () => {};

	const handleUsernameBlur = () => {};

	return (
		<div className={styles["loginPage"]}>
			<div className={styles["loginWrapper"]}>
				<div className={styles["logoContainer"]}>
					<div className={styles["logoTitle"]}>
						<span>Currency</span>
						<span>App</span>
					</div>
				</div>
				<div className={styles["loginContainer"]} style={{ width: loginContainerWidth }}>
					<h1 className={styles["headerTitle"]}>{headerText}</h1>
					<div className={styles["inputForms"]}>
						<div className={styles["inputGroup"]}>
							<span className={styles["name"]}>{loginText}</span>
							<input
								ref={usernameInputRef}
								className={styles["input"]}
								type="username"
								id="loginEmail"
								value={username}
								onChange={handleUsernameChange}
								onKeyDown={handleKeyDown}
								onFocus={handleUsernameFocus}
								onBlur={handleUsernameBlur}
								required
								spellCheck={false}
							/>
						</div>
						<div className={styles["inputGroup"]}>
							<span className={styles["name"]}>{passwordText}</span>
							<input
								ref={passwordInputRef}
								className={styles["input"]}
								type={showPassword ? "text" : "password"}
								id="loginPassword"
								value={password}
								onChange={handlePasswordChange}
								onKeyDown={handleKeyDown}
								required
								spellCheck={false}
							/>
							<div className={styles["icon"]} onClick={handleShowPasswordChange}>
								{showPassword ? <HiEye /> : <HiEyeOff />}
							</div>
						</div>
					</div>
					<div className={classNames(styles["inputGroup"], styles["inputGroupCol"])}>
						<div type="submit" onClick={handleSubmit} className={styles["button"]}>
							<span>{primaryButtonText}</span>
						</div>
						<div
							onClick={() => {
								handleSecondButtonClick();
							}}
							className={styles["buttonSecondary"]}
							style={{ marginLeft: "5px" }}
						>
							<span ref={secondButtonTextRef} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginRegister;
