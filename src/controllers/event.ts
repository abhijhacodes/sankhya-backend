import { Response } from "express";
import publisher from "../db/queues/publisher";
import { EventCaptureRequest } from "../types/common";
import { Job } from "bullmq";
import { eventServices } from "../db/services/event";

const captureEvent = async (req: EventCaptureRequest, res: Response) => {
	try {
		const eventInputBody = {
			project_id: req.project_id,
			ip_address: req.socket.remoteAddress,
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
		const { project_id, ip_address } = job.data;
		const geoLocationAPIURL = `${process.env.GEOLOCATION_API_URL}/${ip_address}?fields=49177`;
		const res = await fetch(geoLocationAPIURL);
		const data = await res.json();
		const {
			status,
			message: errorMessage,
			city,
			country,
			regionName: state,
		} = data;
		if (status === "success") {
			await eventServices.storeEvent({
				project_id,
				city,
				state,
				country,
			});
		} else {
			console.log("Error in processing event: ", errorMessage);
		}
	} catch (error) {
		console.log("Error in processing event: ", error);
	}
};

export const eventControllers = {
	captureEvent,
	processAndStoreEvent,
};
