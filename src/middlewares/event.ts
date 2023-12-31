import { NextFunction, Response } from "express";

import { projectServices } from "../db/services/project";
import { EventCaptureRequest } from "../types/common";

const validateAPIKey = async (
	req: EventCaptureRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const apiKey = req.headers["x-api-key"] as string;
		if (!apiKey) {
			return res.status(400).json({
				message: "API key is required",
				success: false,
			});
		}

		const projectId = await projectServices.getProjectByAPIKey({
			api_key: apiKey,
		});
		if (!projectId) {
			return res.status(401).json({
				message: "Invalid API key provided",
				success: false,
			});
		}

		req.project_id = projectId;
		next();
	} catch (error) {
		console.log("Error in validating API key: ", error);
		return res.status(500).json({
			message: "Internal server error",
			success: false,
		});
	}
};

export const eventMiddlewares = {
	validateAPIKey,
};
