import { Response } from "express";
import { EventCaptureRequest } from "../types/common";

const captureEvent = async (req: EventCaptureRequest, res: Response) => {
	try {
		const eventInputBody = {
			project_id: req.project_id,
			ip_address: req.socket.remoteAddress,
		};
		// capture this event in redis queue
		res.status(200).json({ message: "Event captured", success: true });
	} catch (error) {
		console.log("Error in capturing event: ", error);
		return res.status(500).json({
			message: "Internal server error",
			success: false,
		});
	}
};

export const eventControllers = {
	captureEvent,
};
