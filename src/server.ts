import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoute from "./routes/auth";
import customerRoute from "./routes/customer";
import eventRoute from "./routes/event";
import projectRoute from "./routes/project";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/customer", customerRoute);
app.use("/api/v1/event", eventRoute);
app.use("/api/v1/project", projectRoute);

const port = process.env.SERVER_PORT || 8080;
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
