import bcrypt from "bcryptjs";
import express from "express";
import jwt from "jsonwebtoken";
import { users } from "../utils/authUtils.js";

const router = express.Router();

router.post("/login", async (req, res) => {
	const { username, password } = req.body;
	const user = users.get(username);

	if (!user) {
		res.status(401).send("Sorry. User not found");
	} else if (!(await bcrypt.compare(password, user.password))) {
		res.status(401).send("Invalid password");
	} else {
		const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1h" });
		res.json({ token });
	}
});

router.post("/register", async (req, res) => {
	try {
		console.log("Register endpoint hit");
		const { username, password } = req.body;

		if (!username || !password) {
			return res.status(400).send("Username and password are required");
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		users.set(username, { username, password: hashedPassword });

		res.status(201).send("User creation successful!");
	} catch (error) {
		console.error("Register Error:", error);
		res.status(500).send("Internal Server Error");
	}
});

router.get("/user/:username", async (req, res) => {
	const username = req.params.username;
	const user = users.get(username);
	if (user) {
		res.json({ username: user.username });
	} else {
		res.status(404).send("User not found");
	}
});

router.put("/user/:username", async (req, res) => {
	const { newUsername, newPassword } = req.body;
	const user = users.get(req.params.username);

	if (!user) {
		res.status(404).send("User not found");
		return;
	}

	if (newUsername && newUsername !== req.params.username && users.has(newUsername)) {
		res.status(409).send("Username already taken");
		return;
	}

	if (newUsername && newUsername !== req.params.username) {
		users.delete(req.params.username); // Remove old username key
		user.username = newUsername; // Update username
		users.set(newUsername, user); // Add with new username key
	}

	if (newPassword) {
		const hashedPassword = await bcrypt.hash(newPassword, 10);
		user.password = hashedPassword;
	}

	const newToken = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: "1h" });
	res.json({ token: newToken, message: "Update successful" });
});

router.get("/token", (req, res) => {
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		return res.status(401).send("No token provided");
	}

	const token = authHeader.split(" ")[1];
	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		if (err) {
			console.error("Token verification error:", err.message);
			return res.status(403).send(`Invalid or expired token: ${err.message}`);
		}
		res.send({ valid: true, user });
	});
});

export default router;
