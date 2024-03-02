import { Request, Response } from "express";
import { AnalyticsServiceInput } from "../types/common";
import { analyticsServices } from "../db/services/analytics";
import { AnalyticsEndpoint } from "../utils/constants";

const getAnalyticsData = async (req: Request, res: Response) => {
	try {
		const { analyticsEndpoint } = req.params;

		const endpointToServiceMapper = {
			[AnalyticsEndpoint.TotalVisitors]:
				analyticsServices.getTotalVisitors,
			[AnalyticsEndpoint.VisitorsTrend]:
				analyticsServices.getVisitorsTrend,
			[AnalyticsEndpoint.TopCities]: analyticsServices.getTopCities,
			[AnalyticsEndpoint.TopStates]: analyticsServices.getTopStates,
			[AnalyticsEndpoint.TopCountries]: analyticsServices.getTopCountries,
			[AnalyticsEndpoint.OperatingSystems]:
				analyticsServices.getOperatingSystems,
			[AnalyticsEndpoint.TopDeviceSizes]:
				analyticsServices.getTopDeviceSizes,
			[AnalyticsEndpoint.TrafficTrend]: analyticsServices.getTrafficTrend,
		};

		const serviceFunction =
			endpointToServiceMapper[analyticsEndpoint as AnalyticsEndpoint];

		if (!serviceFunction) {
			return res.status(404).json({
				message: "Requested resource doesn't exist",
				success: false,
			});
		}

		const data = await serviceFunction(req.body as AnalyticsServiceInput);
		return res.status(200).json({ data, success: true });
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
