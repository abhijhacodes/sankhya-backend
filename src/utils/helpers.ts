import { Request } from "express";
import {
	AnalyticsServiceInput,
	GeolocationResponse,
	TrafficTrendOutput,
} from "../types/common";

export const getClientURLsFromRequest = (req: Request) => {
	const origin = req.get("origin") ?? "";
	const urls = [origin];

	urls.push(`http://${origin.replace(/^www\./, "")}`);
	urls.push(`https://${origin.replace(/^www\./, "")}`);
	urls.push(`http://www.${origin}`);
	urls.push(`https://www.${origin}`);
	urls.push(`www.${origin}`);

	return urls;
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
		const geoLocationAPIURL = `${process.env.GEOLOCATION_API_URL}/${ipAddress}?fields=49179`;
		const res = await fetch(geoLocationAPIURL);
		const data = await res.json();
		const {
			status,
			message: errorMessage,
			city,
			country,
			countryCode,
			regionName: state,
		} = data;
		if (status === "success") {
			return {
				city,
				state,
				country,
				countryCode,
			};
		}
		console.log(
			`Could not get geolocation details for IP (${ipAddress}) : ${errorMessage}`
		);
		return {
			city: "Unknown",
			state: "Unknown",
			country: "Unknown",
			countryCode: "Unknown",
		};
	} catch (error) {
		console.log("Error in geolocation API: ", error);
		return {
			city: "Unknown",
			state: "Unknown",
			country: "Unknown",
			countryCode: "Unknown",
		};
	}
};

export const getFormattedAnalyticsServiceInput = ({
	project_ids,
	start_date,
	end_date,
}: AnalyticsServiceInput) => {
	return [project_ids.join(","), start_date, end_date];
};

export const getParsedInt = (value: string | number) => {
	const parsedInt = parseInt(value as string, 10);
	return isNaN(parsedInt) ? 0 : parsedInt;
};

// The query only returns the periods with at least 1 event, this function adds the periods with 0 events in the response to generate complete hourwise trend
export const addMissingPeriodsInTrafficTrend = (
	trafficTrendData: TrafficTrendOutput
) => {
	const allHourPeriods = Array.from({ length: 24 }, (_, index) => {
		const startHour = index.toString().padStart(2, "0");
		const endHour = (index + 1).toString().padStart(2, "0");
		return `${startHour}-${endHour}`;
	});

	const existingDataMap = new Map(
		trafficTrendData.map((entry) => [
			entry.period,
			{ ...entry, total_visitors: getParsedInt(entry.total_visitors) },
		])
	);

	return allHourPeriods.map((period) => ({
		period,
		value: (existingDataMap.get(period) || { total_visitors: 0 })
			.total_visitors,
	}));
};
