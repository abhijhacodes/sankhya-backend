import { Request, Response } from "express";
import { AnalyticsServiceInput } from "../types/common";
import { analyticsServices } from "../db/services/analytics";
import { ValidAnalyticsEndpoints } from "../utils/constants";

const getAnalyticsData = async (req: Request, res: Response) => {
	try {
		const { analyticsEndpoint } = req.params;
		switch (analyticsEndpoint) {
			case ValidAnalyticsEndpoints.TotalVisitors:
				const totalVisitors = await analyticsServices.getTotalVisitors(
					req.body as AnalyticsServiceInput
				);
				return res.status(200).json({ totalVisitors, success: true });

			default:
				break;
		}
	} catch (error) {
		res.status(500).json({
			message: "Internal Server Error",
			success: false,
		});
	}
};

export const analyticsControllers = {
	getAnalyticsData,
};
