import { NextFunction, Response } from "express";
import { UUID } from "crypto";

import { projectServices } from "../db/services/project";
import { EventCaptureRequest } from "../types/common";
import { checkIfUUIDIsValid, getClientURLFromRequest } from "../utils/helpers";

const validateAPIKey = async (
	req: EventCaptureRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const apiKey = req.headers["x-api-key"] as UUID;
		if (!apiKey || !checkIfUUIDIsValid(apiKey)) {
			return res.status(400).json({
				message: "Valid API key is required",
				success: false,
			});
		}

		const projectDetails = await projectServices.getProjectByAPIKey({
			api_key: apiKey,
		});

		if (
			!projectDetails?.project_id ||
			projectDetails?.project_client_url !== getClientURLFromRequest(req)
		) {
			return res.status(401).json({
				message: "You are not authorized to perform this action",
				success: false,
			});
		}

		req.project_id = projectDetails.project_id;
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
