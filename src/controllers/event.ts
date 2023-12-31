import { Request, Response } from "express";

const captureEvent = async (req: Request, res: Response) => {
	try {
		console.log("captureEvent called");
		res.status(200).json({ message: "Event captured", success: true });
	} catch (error) {}
};

export const eventControllers = {
	captureEvent,
};
