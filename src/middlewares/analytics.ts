import { NextFunction, Request, Response } from "express";

import { AnalyticsServiceInput, AuthenticatedRequest } from "../types/common";
import { validators } from "../utils/validators";
import { ValidAnalyticsEndpoints } from "../utils/constants";

const validateAnalyticsEndpoint = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { analyticsEndpoint } = req.params;
	if (
		!Object.values(ValidAnalyticsEndpoints).includes(
			analyticsEndpoint as ValidAnalyticsEndpoints
		)
	) {
		return res.status(404).json({
			message: "Requested resource doesn't exist",
			success: false,
		});
	}

	next();
};

const validateAnalyticsRequestBody = async (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction
) => {
	const { project_ids, start_date, end_date } =
		req.body as AnalyticsServiceInput;

	if (!validators.checkIfArrayOfUUIDs(project_ids)) {
		return res
			.status(400)
			.json({ message: "Invalid project ids", success: false });
	}

	if (
		!validators.checkIfValidDateTime(start_date) ||
		!validators.checkIfValidDateTime(end_date)
	) {
		return res
			.status(400)
			.json({ message: "Invalid datetime format", success: false });
	}

	next();
};

export const analyticsMiddlewares = {
	validateAnalyticsEndpoint,
	validateAnalyticsRequestBody,
};
