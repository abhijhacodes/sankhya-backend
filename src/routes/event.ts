import express from "express";
import cors from "cors";

import { eventControllers } from "../controllers/event";
import { eventMiddlewares } from "../middlewares/event";

const router = express.Router();

router.use(
	cors({
		origin: "*",
	})
);

router.post(
	"/",
	eventMiddlewares.validateAPIKey,
	eventControllers.captureEvent
);

export default router;
