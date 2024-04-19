import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();

		const response = await fetch(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/api/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: username,
				password: password,
			}),
		});

		if (response.ok) {
			const { token } = await response.json();
			localStorage.setItem("token", token);
			navigate("/dashboard");
		} else {
			const errorText = await response.text();

			alert(`Failed to log in: ${errorText}`);
		}
	};

	return (
		<div>
			<h1>Login</h1>
			<form onSubmit={handleSubmit}>
				<input type="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
				<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
				<button type="submit">Login</button>
			</form>
		</div>
	);
};

export default Login;
