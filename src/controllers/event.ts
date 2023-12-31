import { Response } from "express";
import publisher from "../db/queues/publisher";
import { EventCaptureRequest } from "../types/common";
import { Job } from "bullmq";

const captureEvent = async (req: EventCaptureRequest, res: Response) => {
	try {
		const eventInputBody = {
			project_id: req.project_id,
			ip_address: req.socket.remoteAddress,
		};
		await publisher.add("event", eventInputBody, {
			removeOnComplete: true,
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
		console.log(`received job ${job.id} with data: ${job.data.project_id}`);
	} catch (error) {
		console.log("Error in processing event: ", error);
	}
};

export const eventControllers = {
	captureEvent,
	processAndStoreEvent,
};
