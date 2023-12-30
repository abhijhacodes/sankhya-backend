import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoute from "./routes/auth";
import customerRoute from "./routes/customer";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/customer", customerRoute);

const port = process.env.SERVER_PORT || 8080;
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
