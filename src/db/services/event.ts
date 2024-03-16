import dbConnectionPool from "../connection";
import { CreateEventInput } from "../../types/common";

const storeEvent = async ({
	project_id,
	city,
	state,
	country,
	countryCode,
	screen_resolution,
	operating_system,
}: CreateEventInput) => {
	await dbConnectionPool.query(
		`INSERT INTO events(project_id, city, state, country, country_code, screen_resolution, operating_system) VALUES($1, $2, $3, $4, $5, $6)`,
		[
			project_id,
			city,
			state,
			country,
			countryCode,
			screen_resolution,
			operating_system,
		]
	);
};

export const eventServices = {
	storeEvent,
};
