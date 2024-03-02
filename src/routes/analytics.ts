import express from "express";
import { analyticsControllers } from "../controllers/analytics";
import { authMiddlewares } from "../middlewares/auth";

const router = express.Router();

router.post(
	"/totalVisitors",
	authMiddlewares.populateCustomerDetails,
	analyticsControllers.getTotalVisitors
);
router.post(
	"/visitorsTrend",
	authMiddlewares.populateCustomerDetails,
	analyticsControllers.getVisitorsTrend
);
router.post(
	"/topCities",
	authMiddlewares.populateCustomerDetails,
	analyticsControllers.getTopCities
);
router.post(
	"/topStates",
	authMiddlewares.populateCustomerDetails,
	analyticsControllers.getTopStates
);
router.post(
	"/topCountries",
	authMiddlewares.populateCustomerDetails,
	analyticsControllers.getTopCountries
);
router.post(
	"/operatingSystems",
	authMiddlewares.populateCustomerDetails,
	analyticsControllers.getOperatingSystems
);
router.post(
	"/topDeviceSizes",
	authMiddlewares.populateCustomerDetails,
	analyticsControllers.getTopDeviceSizes
);
router.post(
	"/trafficTrend",
	authMiddlewares.populateCustomerDetails,
	analyticsControllers.getTrafficTrend
);

export default router;
