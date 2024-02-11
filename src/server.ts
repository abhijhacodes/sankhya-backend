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

const corsOptions = {
	origin: process.env.SANKHYA_FRONTEND_URL,
};

app.use("/api/v1/auth", cors(corsOptions), authRoute);
app.use("/api/v1/customer", cors(corsOptions), customerRoute);
app.use("/api/v1/project", cors(corsOptions), projectRoute);
app.use("/api/v1/event", cors(), eventRoute);

const port = process.env.SERVER_PORT || 8080;
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
