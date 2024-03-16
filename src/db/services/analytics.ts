import dbConnectionPool from "../connection";
import { AnalyticsServiceInput } from "../../types/common";
import {
	addMissingPeriodsInTrafficTrend,
	getFormattedAnalyticsServiceInput,
	getParsedInt,
} from "../../utils/helpers";

const getTotalVisitors = async (input: AnalyticsServiceInput) => {
	const result = await dbConnectionPool.query(
		`SELECT COUNT(*) FROM events WHERE project_id IN ($1) AND created_at BETWEEN $2 AND $3`,
		getFormattedAnalyticsServiceInput(input)
	);
	return {
		totalVisitors: getParsedInt(result?.rows[0]?.count),
	};
};

const getVisitorsTrend = async (input: AnalyticsServiceInput) => {
	const result = await dbConnectionPool.query(
		`SELECT DATE(created_at) AS event_date, COUNT(*) AS total_visitors FROM events WHERE project_id IN ($1) AND created_at BETWEEN $2 AND $3 GROUP BY event_date ORDER BY event_date`,
		getFormattedAnalyticsServiceInput(input)
	);
	return result?.rows?.map((row) => ({
		date: new Date(row.event_date).toISOString().split("T")[0],
		value: getParsedInt(row.total_visitors),
	}));
};

const getTopCities = async (input: AnalyticsServiceInput) => {
	const result = await dbConnectionPool.query(
		`SELECT city, COUNT(*) AS visitors_from_city FROM events WHERE project_id IN ($1) AND created_at BETWEEN $2 AND $3 GROUP BY city ORDER BY visitors_from_city DESC`,
		getFormattedAnalyticsServiceInput(input)
	);
	return result?.rows?.map((row) => ({
		name: row.city,
		value: getParsedInt(row.visitors_from_city),
	}));
};

const getTopStates = async (input: AnalyticsServiceInput) => {
	const result = await dbConnectionPool.query(
		`SELECT state, COUNT(*) AS visitors_from_state FROM events WHERE project_id IN ($1) AND created_at BETWEEN $2 AND $3 GROUP BY state ORDER BY visitors_from_state DESC`,
		getFormattedAnalyticsServiceInput(input)
	);
	return result?.rows?.map((row) => ({
		name: row.state,
		value: getParsedInt(row.visitors_from_state),
	}));
};

const getTopCountries = async (input: AnalyticsServiceInput) => {
	const result = await dbConnectionPool.query(
		`SELECT country_code, COUNT(*) AS visitors_from_country FROM events WHERE project_id IN ($1) AND created_at BETWEEN $2 AND $3 GROUP BY country_code ORDER BY visitors_from_country DESC`,
		getFormattedAnalyticsServiceInput(input)
	);
	return result?.rows?.map((row) => ({
		name: row.country_code,
		value: getParsedInt(row.visitors_from_country),
	}));
};

const getOperatingSystems = async (input: AnalyticsServiceInput) => {
	const result = await dbConnectionPool.query(
		`SELECT operating_system, COUNT(*) AS total_users FROM events WHERE project_id IN ($1) AND created_at BETWEEN $2 AND $3 GROUP BY operating_system ORDER BY total_users DESC`,
		getFormattedAnalyticsServiceInput(input)
	);
	return result?.rows?.map((row) => ({
		name: row.operating_system,
		value: getParsedInt(row.total_users),
	}));
};

const getTopDeviceSizes = async (input: AnalyticsServiceInput) => {
	const result = await dbConnectionPool.query(
		`SELECT screen_resolution, COUNT(*) AS total_users FROM events WHERE project_id IN ($1) AND created_at BETWEEN $2 AND $3 GROUP BY screen_resolution ORDER BY total_users DESC`,
		getFormattedAnalyticsServiceInput(input)
	);
	return result?.rows?.map((row) => ({
		size: row.screen_resolution,
		value: getParsedInt(row.total_users),
	}));
};

const getTrafficTrend = async (input: AnalyticsServiceInput) => {
	const result = await dbConnectionPool.query(
		`SELECT TO_CHAR(DATE_TRUNC('hour', created_at), 'HH24') || '-' || TO_CHAR((DATE_TRUNC('hour', created_at) + '1 hour'::interval)::timestamp, 'HH24') AS period, COUNT(*) AS total_visitors FROM events WHERE project_id IN ($1) AND created_at BETWEEN $2 AND $3 GROUP BY period ORDER BY period`,
		getFormattedAnalyticsServiceInput(input)
	);
	return addMissingPeriodsInTrafficTrend(result?.rows);
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
