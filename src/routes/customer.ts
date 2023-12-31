import express from "express";
import { authMiddlewares } from "../middlewares/auth";
import { customerControllers } from "../controllers/customer";

const router = express.Router();

router.get(
	"/",
	authMiddlewares.populateCustomerDetails,
	customerControllers.getCustomerById
);

export default router;
