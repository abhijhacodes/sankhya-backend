import dbConnectionPool from "../connection";
import { AnalyticsServiceInput } from "../../types/common";

const getTotalVisitors = async ({}: AnalyticsServiceInput) => {
	await dbConnectionPool.query(``, []);
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
