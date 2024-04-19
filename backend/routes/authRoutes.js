import bcrypt from "bcryptjs";
import express from "express";
import jwt from "jsonwebtoken";
import { users } from "../utils/authUtils.js";

const router = express.Router();

router.post("/login", async (req, res) => {
	const { username, password } = req.body;
	const user = users.get(username);

	if (user && (await bcrypt.compare(password, user.password))) {
		const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1h" });
		res.json({ token });
	} else {
		res.status(401).send("Unauthorized");
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

		res.status(201).send("User created");
	} catch (error) {
		console.error("Register Error:", error);
		res.status(500).send("Internal Server Error");
	}
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
