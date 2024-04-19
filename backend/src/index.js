import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import authRoutes from "../routes/authRoutes.js";

dotenv.config();

const app = express();

app.use(
	cors({
		origin: `http://localhost:${process.env.FRONTEND_PORT}`,
		credentials: true,
	}),
);

app.use(express.json());

app.use("/api", authRoutes);

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Something broke!");
});

const PORT = process.env.BACKEND_PORT || 6970;

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
