import { NextFunction, Response } from "express";

import { tokenHelpers } from "../utils/tokens";
import { AuthenticatedRequest } from "../types/common";
import { CustomerModel } from "../types/models";

const populateCustomerDetails = async (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction
) => {
	const token = req.headers.authorization?.split(" ")[1];
	const verifyTokenResult = tokenHelpers.verifyJwtToken(token);
	if (!verifyTokenResult) {
		return res
			.status(401)
			.json({ message: "Unauthorized", success: false });
	} else if (verifyTokenResult === "expired") {
		return res
			.status(403)
			.json({ message: "Session expired", success: false });
	}

	req.customer = verifyTokenResult as CustomerModel;
	next();
};

export const authMiddlewares = {
	populateCustomerDetails,
};
