import dbConnectionPool from "../connection";
import { CreateEventInput } from "../../types/common";

const storeEvent = async ({
	project_id,
	city,
	state,
	country,
}: CreateEventInput) => {
	await dbConnectionPool.query(
		`INSERT INTO events(project_id, city, state, country) VALUES($1, $2, $3, $4)`,
		[project_id, city, state, country]
	);
};

export const eventServices = {
	storeEvent,
};
