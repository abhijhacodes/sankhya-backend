import express from "express";
import { authMiddlewares } from "../middlewares/auth";
import { projectControllers } from "../controllers/project";

const router = express.Router();

router.post(
	"/",
	authMiddlewares.populateCustomerDetails,
	projectControllers.createNewProject
);
router.get(
	"/",
	authMiddlewares.populateCustomerDetails,
	projectControllers.getProjectDetails
);

export default router;
