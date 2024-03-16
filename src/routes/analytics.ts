import express from "express";

import { analyticsControllers } from "../controllers/analytics";
import { authMiddlewares } from "../middlewares/auth";
import { analyticsMiddlewares } from "../middlewares/analytics";

const router = express.Router();

router.post(
	"/:analyticsEndpoint",
	analyticsMiddlewares.validateAnalyticsEndpoint,
	authMiddlewares.populateCustomerDetails,
	analyticsMiddlewares.validateAnalyticsRequestBody,
	analyticsControllers.getAnalyticsData
);

export default router;
