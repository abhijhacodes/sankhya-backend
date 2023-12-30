import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth";

const app = express();
dotenv.config();
app.use(express.json());

app.use("/api/v1/auth", authRoute);

const port = process.env.SERVER_PORT || 8080;
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
