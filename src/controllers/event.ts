import { Response } from "express";

import { eventServices } from "../db/services/event";
import { EventCaptureRequest } from "../types/common";
import { getGeolocationDetails } from "../utils/helpers";

const captureAndStoreEvent = async (
	req: EventCaptureRequest,
	res: Response
) => {
	try {
		const project_id = req.project_id!;
		console.log(
			"Received event request",
			`header: '${req.headers["x-forwarded-for"]}'`,
			`socket: '${req.socket.remoteAddress}'`
		);

		const ip_address =
			(req.headers["x-forwarded-for"] as string) ||
			req.socket.remoteAddress!;
		const client_details = req.body;

		const { city, state, country, countryCode } =
			await getGeolocationDetails(ip_address);
		await eventServices.storeEvent({
			project_id,
			city,
			state,
			country,
			countryCode,
			screen_resolution: client_details?.screenResolution ?? "Unknown",
			operating_system: client_details?.operatingSystem ?? "Unknown",
		});

		res.status(200).json({ message: "Event captured", success: true });
	} catch (error) {
		return res.status(500).json({
			message: "Internal server error",
			success: false,
		});
	}
};

export const eventControllers = {
	captureAndStoreEvent,
};
