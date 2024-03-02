import dbConnectionPool from "../connection";
import { AnalyticsServiceInput } from "../../types/common";

const getTotalVisitors = async ({
	project_ids,
	start_date,
	end_date,
}: AnalyticsServiceInput) => {
	const result = await dbConnectionPool.query(
		`SELECT COUNT(*) FROM events WHERE project_id IN ($1) AND created_at BETWEEN $2 AND $3`,
		[project_ids.join(","), start_date, end_date]
	);
	return result?.rows[0]?.count;
};

const getVisitorsTrend = async ({}: AnalyticsServiceInput) => {
	await dbConnectionPool.query(``, []);
};

const getTopCities = async ({}: AnalyticsServiceInput) => {
	await dbConnectionPool.query(``, []);
};

const getTopStates = async ({}: AnalyticsServiceInput) => {
	await dbConnectionPool.query(``, []);
};

const getTopCountries = async ({}: AnalyticsServiceInput) => {
	await dbConnectionPool.query(``, []);
};

const getOperatingSystems = async ({}: AnalyticsServiceInput) => {
	await dbConnectionPool.query(``, []);
};

const getTopDeviceSizes = async ({}: AnalyticsServiceInput) => {
	await dbConnectionPool.query(``, []);
};

const getTrafficTrend = async ({}: AnalyticsServiceInput) => {
	await dbConnectionPool.query(``, []);
};

export const analyticsServices = {
	getTotalVisitors,
	getVisitorsTrend,
	getTopCities,
	getTopStates,
	getTopCountries,
	getOperatingSystems,
	getTopDeviceSizes,
	getTrafficTrend,
};
