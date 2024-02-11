import { Request } from "express";
import { GeolocationResponse } from "../types/common";

export const getClientURLFromRequest = (req: Request) => {
	return req.get("origin");
};

export const checkIfUUIDIsValid = (uuid: string) => {
	const uuidRegex = new RegExp(
		"^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$"
	);
	return uuidRegex.test(uuid);
};

export const getGeolocationDetails = async (
	ipAddress: string
): GeolocationResponse => {
	try {
		const geoLocationAPIURL = `${process.env.GEOLOCATION_API_URL}/${ipAddress}?fields=49177`;
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
			return {
				city,
				state,
				country,
			};
		}
		console.log(
			`Could not get geolocation details for IP (${ipAddress}) : ${errorMessage}`
		);
		return {
			city: "Unknown",
			state: "Unknown",
			country: "Unknown",
		};
	} catch (error) {
		console.log("Error in geolocation API: ", error);
		return {
			city: "Unknown",
			state: "Unknown",
			country: "Unknown",
		};
	}
};
