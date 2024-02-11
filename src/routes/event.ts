import express from "express";

import { eventControllers } from "../controllers/event";
import { eventMiddlewares } from "../middlewares/event";

const router = express.Router();

router.post(
	"/",
	eventMiddlewares.validateAPIKey,
	eventControllers.captureEvent
);

export default router;
