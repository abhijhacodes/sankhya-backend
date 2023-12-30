import { NextFunction, Request, Response } from "express";
import { tokenHelpers } from "../utils/tokens";

const populateUser = async (
	req: Request & { user?: any },
	res: Response,
	next: NextFunction
) => {
	const tokenResult = tokenHelpers.verifyJwtToken(req?.cookies?.token);
	if (!tokenResult) {
		return res
			.status(401)
			.json({ message: "Unauthorized", success: false });
	} else if (tokenResult === "expired") {
		return res
			.status(403)
			.json({ message: "Session expired", success: false });
	}
	req.user = tokenResult;
	next();
};

export const authMiddlewares = {
	populateUser,
};
