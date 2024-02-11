import { Request } from "express";

export const getClientURLFromRequest = (req: Request) => {
	return req.get("origin");
};

export const checkIfUUIDIsValid = (uuid: string) => {
	const uuidRegex = new RegExp(
		"^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$"
	);
	return uuidRegex.test(uuid);
};
