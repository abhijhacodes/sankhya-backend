import express from "express";
import { getCustomerById } from "../controllers/customer";
import { authMiddlewares } from "../middlewares/auth";

const router = express.Router();

router.get("/", authMiddlewares.populateUser, getCustomerById);

export default router;
