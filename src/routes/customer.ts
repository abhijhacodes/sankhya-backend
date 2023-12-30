import express from "express";
import { generateAPIKey, getCustomerById } from "../controllers/customer";
import { authMiddlewares } from "../middlewares/auth";

const router = express.Router();

router.get("/", authMiddlewares.populateUser, getCustomerById);
router.post("/api-key", authMiddlewares.populateUser, generateAPIKey);

export default router;
