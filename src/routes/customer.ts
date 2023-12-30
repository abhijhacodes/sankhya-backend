import express from "express";
import { authMiddlewares } from "../middlewares/auth";
import { customerControllers } from "../controllers/customer";

const router = express.Router();

router.get(
	"/",
	authMiddlewares.populateUser,
	customerControllers.getCustomerById
);
router.post(
	"/api-key",
	authMiddlewares.populateUser,
	customerControllers.generateAPIKey
);

export default router;
