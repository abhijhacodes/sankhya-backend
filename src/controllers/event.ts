import { Response } from "express";
import { Job } from "bullmq";

import publisher from "../db/queues/publisher";
import { eventServices } from "../db/services/event";
import { EventCaptureRequest } from "../types/common";
import { getGeolocationDetails } from "../utils/helpers";

const captureEvent = async (req: EventCaptureRequest, res: Response) => {
	try {
		const eventInputBody = {
			project_id: req.project_id,
			ip_address: req.socket.remoteAddress,
			client_details: { ...req.body },
		};
		await publisher.add("event", eventInputBody, {
			removeOnComplete: true,
			removeOnFail: false,
		});
		res.status(200).json({ message: "Event captured", success: true });
	} catch (error) {
		console.log("Error in capturing event: ", error);
		return res.status(500).json({
			message: "Internal server error",
			success: false,
		});
	}
};

const processAndStoreEvent = async (job: Job) => {
	try {
		const { project_id, ip_address, client_details } = job.data;
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
	} catch (error) {
		console.log("Error in processing event: ", error);
	}
};

export const eventControllers = {
	captureEvent,
	processAndStoreEvent,
};
