import { useEffect, useRef, useState } from "react";
import { useToast } from "../context/ToastContext";
import styles from "../styles/AccountSettings.module.scss";
import { classNames } from "../utils/classNames";
import { DEFAULT_BASE_CURRENCY, SELECTED_BASE_CURRENCY_KEY, STORAGE_UPDATE_KEY } from "../utils/constants";
import { notifyOptions } from "../utils/notifyOptions";
import { CurrencySelectorForm } from "./CurrencySelectorForm";

const parseJwt = (token) => {
	try {
		const base64Url = token.split(".")[1];
		const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
		const jsonPayload = decodeURIComponent(
			atob(base64)
				.split("")
				.map(function (c) {
					return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
				})
				.join(""),
		);

		return JSON.parse(jsonPayload);
	} catch (e) {
		return null;
	}
};

export const AccountSettings = () => {
	const { notify } = useToast();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [willChangeUsername, setWillChangeUsername] = useState(false);
	const [willChangePassword, setWillChangePassword] = useState(false);
	const [newPassword, setNewPassword] = useState("");
	const [newUsername, setNewUsername] = useState("");
	const [originalUsername, setOriginalUsername] = useState("");
	const [editMode, setEditMode] = useState({ username: false, password: false });
	const [isButtonDisabled, setButtonDisabled] = useState(true);

	const usernameInputRef = useRef();
	const passwordInputRef = useRef();

	const [selectedBaseCurrency, setSelectedBaseCurrency] = useState(() => {
		return JSON.parse(localStorage.getItem(SELECTED_BASE_CURRENCY_KEY)) || DEFAULT_BASE_CURRENCY;
	});

	const handleSaveCurrencies = (selectedCurrencies) => {
		const baseCurrency = selectedCurrencies[0];
		localStorage.setItem(SELECTED_BASE_CURRENCY_KEY, JSON.stringify(baseCurrency));

		window.dispatchEvent(new CustomEvent(STORAGE_UPDATE_KEY));
	};

	useEffect(() => {
		const handleStorageUpdate = () => {
			setSelectedBaseCurrency(JSON.parse(localStorage.getItem(SELECTED_BASE_CURRENCY_KEY)) || DEFAULT_BASE_CURRENCY);
		};

		window.addEventListener(STORAGE_UPDATE_KEY, handleStorageUpdate);

		return () => {
			window.removeEventListener(STORAGE_UPDATE_KEY, handleStorageUpdate);
		};
	}, []);

	useEffect(() => {
		const fetchUserInfo = async () => {
			const token = localStorage.getItem("token");
			const user = parseJwt(token);
			const response = await fetch(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/api/user/${user.username}`);
			if (response.ok) {
				const data = await response.json();
				setUsername(data.username);
				setOriginalUsername(data.username);
			}
		};

		fetchUserInfo();
	}, [setUsername, setOriginalUsername]);

	const toggleEdit = (field) => {
		if (field === "username") {
			setEditMode((prev) => ({ ...prev, username: !prev.username }));
			setWillChangeUsername(!willChangeUsername);

			setTimeout(() => {
				if (usernameInputRef.current) {
					usernameInputRef.current.focus();
				}
			}, 0);
		} else {
			setEditMode((prev) => ({ ...prev, password: !prev.password }));
			setWillChangePassword(!willChangePassword);

			setTimeout(() => {
				if (passwordInputRef.current) {
					passwordInputRef.current.focus();
				}
			}, 0);
		}
	};

	const handleUpdate = async (field) => {
		const token = localStorage.getItem("token");
		const user = parseJwt(token);
		const body = {};

		if (field === "username" && newUsername) {
			body.newUsername = newUsername;
		}

		if (field === "password" && newPassword) {
			body.newPassword = newPassword;
		}

		const response = await fetch(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/api/user/${user.username}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});

		if (response.ok) {
			const data = await response.json();
			localStorage.setItem("token", data.token);

			if (field === "username") {
				setUsername(newUsername);
				setOriginalUsername(newUsername); // Update originalUsername to reflect the new username
				setNewUsername(""); // Reset the newUsername to be ready for next edits
				setEditMode((prev) => ({ ...prev, username: false })); // Toggle off edit mode for username
				setWillChangeUsername(false); // Ensure willChangeUsername is reset
			}

			if (field === "password") {
				setNewPassword(""); // Reset the newPassword to be ready for next edits
				setEditMode((prev) => ({ ...prev, password: false })); // Toggle off edit mode for password
				setWillChangePassword(false); // Ensure willChangePassword is reset
			}

			notify("Update successful!", notifyOptions);
		} else {
			notify("Failed to update!", notifyOptions);
		}
	};

	const handleCancel = (field) => {
		if (field === "username") {
			setNewUsername(originalUsername);
			setWillChangeUsername(false);
			setEditMode((prev) => ({ ...prev, username: false }));
		} else if (field === "password") {
			setNewPassword("");
			setWillChangePassword(false);
			setEditMode((prev) => ({ ...prev, password: false }));
		}
	};

	return (
		<>
			<div className={styles["accountSettings"]}>
				<div className={styles["accountSettings-wrapper"]}>
					<h3 className={styles["sectionHeader"]}>Currency Settings</h3>
					<div className={classNames(styles["row"], styles["rowPadded"])}>
						<span className={styles["optionName"]}>Selected Base Currency</span>
						<div className={styles["optionValue"]}>
							<CurrencySelectorForm
								onSave={handleSaveCurrencies}
								allowMultipleSelection={false}
								initialCurrencies={selectedBaseCurrency}
								headerTitle={null}
								width={null}
								height={null}
							/>
						</div>
					</div>
					<h3 className={styles["sectionHeader"]}>Account Settings</h3>
					<div className={styles["row"]}>
						<span className={styles["optionName"]}>Username</span>
						<div className={styles["col"]}>
							{editMode.username ? (
								<>
									<div className={styles["optionValue"]}>
										<input
											ref={usernameInputRef}
											type="text"
											value={newUsername}
											onChange={(e) => {
												setNewUsername(e.target.value);
												setButtonDisabled(e.target.value === username);
											}}
											spellCheck={false}
										/>
									</div>
									<div className={styles["optionButtons"]}>
										<div
											className={classNames(styles["optionButton"], {
												[styles["optionButtonDisabled"]]: isButtonDisabled,
											})}
											onClick={() => handleUpdate("username")}
										>
											Update
										</div>
										<div className={styles["optionButton"]} onClick={() => handleCancel("username")}>
											Cancel
										</div>
									</div>
								</>
							) : (
								<>
									<div className={styles["optionValue"]}>
										<span>{username}</span>
									</div>
									<div className={styles["optionButtons"]}>
										<div className={styles["optionButton"]} onClick={() => toggleEdit("username")}>
											Edit
										</div>
									</div>
								</>
							)}
						</div>
					</div>
					<div className={styles["row"]}>
						<span className={styles["optionName"]}>Password</span>
						<div className={styles["col"]}>
							{editMode.password ? (
								<>
									<div className={styles["optionValue"]}>
										<input
											ref={passwordInputRef}
											type="password"
											value={newPassword}
											onChange={(e) => {
												setNewPassword(e.target.value);
												setButtonDisabled(!e.target.value);
											}}
											spellCheck={false}
										/>
									</div>
									<div className={styles["optionButtons"]}>
										<div
											className={classNames(styles["optionButton"], {
												[styles["optionButtonDisabled"]]: isButtonDisabled,
											})}
											onClick={() => handleUpdate("password")}
										>
											Update
										</div>
										<div className={styles["optionButton"]} onClick={() => handleCancel("password")}>
											Cancel
										</div>
									</div>
								</>
							) : (
								<>
									<div className={styles["optionValue"]}>
										<span>*****</span>
									</div>
									<div className={styles["optionButtons"]}>
										<div className={styles["optionButton"]} onClick={() => toggleEdit("password")}>
											Edit
										</div>
									</div>
								</>
							)}
						</div>
					</div>
					<div className={styles["row"]}>
						<div></div>
					</div>
				</div>
			</div>
		</>
	);
};
