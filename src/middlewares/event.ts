import { NextFunction, Request, Response } from "express";

const validateAPIKey = (req: Request, res: Response, next: NextFunction) => {
	const apiKey = req.headers["x-api-key"];
	console.log("received api key: ", apiKey);
	next();
};

export const eventMiddlewares = {
	validateAPIKey,
};
