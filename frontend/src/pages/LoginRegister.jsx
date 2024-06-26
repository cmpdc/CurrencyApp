import { Button, Input } from "@mui/joy";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useToast } from "../contexts/ToastContext";
import { useTooltip } from "../contexts/TooltipContext";
import styles from "../styles/LoginRegister.module.scss";
import { classNames } from "../utils/classNames";
import { notifyOptions } from "../utils/notifyOptions";

const LoginRegister = ({ type }) => {
	const navigate = useNavigate();
	const { notify } = useToast();
	const { showTooltip, hideTooltip } = useTooltip();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const showPasswordRef = useRef();

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
	const passwordText = type === "login" ? "Password" : "Create Password";

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
		setUsername("");
		setPassword("");
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
				<motion.div
					className={styles["loginContainer"]}
					style={{ width: loginContainerWidth }}
					animate={{ width: loginContainerWidth }}
					transition={{ duration: 0.3 }}
				>
					<h1 className={styles["headerTitle"]}>{headerText}</h1>
					<div className={styles["inputForms"]}>
						<div className={styles["inputGroup"]}>
							<span className={styles["name"]}>{loginText}</span>
							<Input
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
								sx={{
									width: "100%",
								}}
							/>
						</div>
						<div className={styles["inputGroup"]}>
							<span className={styles["name"]}>{passwordText}</span>
							<Input
								ref={passwordInputRef}
								className={styles["input"]}
								type={showPassword ? "text" : "password"}
								id="loginPassword"
								value={password}
								onChange={handlePasswordChange}
								onKeyDown={handleKeyDown}
								required
								spellCheck={false}
								sx={{
									width: "100%",
								}}
							/>
							<div
								ref={showPasswordRef}
								className={styles["icon"]}
								onClick={handleShowPasswordChange}
								onMouseEnter={() => {
									showTooltip({
										content: showPassword ? "Hide Password" : "Show Password",
										elementRef: showPasswordRef,
										placement: "top",
									});
								}}
								onMouseLeave={() => {
									hideTooltip({
										elementRef: showPasswordRef,
									});
								}}
							>
								{showPassword ? <HiEye /> : <HiEyeOff />}
							</div>
						</div>
					</div>
					<div className={classNames(styles["inputGroup"], styles["inputGroupCol"])}>
						<Button type="submit" onClick={handleSubmit} className={styles["button"]}>
							<span>{primaryButtonText}</span>
						</Button>
						<Button
							onClick={() => {
								handleSecondButtonClick();
							}}
							className={styles["buttonSecondary"]}
							style={{ marginLeft: "5px" }}
							variant="outline"
						>
							<span ref={secondButtonTextRef} style={{ userSelect: "none" }} />
						</Button>
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default LoginRegister;
