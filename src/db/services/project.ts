import dbConnectionPool from "../connection";
import {
	CreateProjectInput,
	CustomerIdInput,
	ProjectAPIKeyInput,
	ProjectAPIKeyOutput,
	ProjectServiceOutput,
} from "../../types/common";

const checkIfCustomerHasProject = async ({
	customer_id,
}: CustomerIdInput): ProjectServiceOutput => {
	const result = await dbConnectionPool.query(
		`SELECT * FROM projects WHERE customer_id = $1`,
		[customer_id]
	);
	return result?.rows[0];
};

const createNewProject = async ({
	project_name,
	customer_id,
}: CreateProjectInput): ProjectServiceOutput => {
	const result = await dbConnectionPool.query(
		`INSERT INTO projects(project_name, customer_id) VALUES($1, $2) RETURNING *`,
		[project_name, customer_id]
	);
	return result?.rows[0];
};

const getProjectByAPIKey = async ({
	api_key,
}: ProjectAPIKeyInput): ProjectAPIKeyOutput => {
	const result = await dbConnectionPool.query(
		`SELECT project_id FROM projects WHERE api_key = $1`,
		[api_key]
	);
	return result?.rows[0]?.project_id;
};

export const projectServices = {
	createNewProject,
	checkIfCustomerHasProject,
	getProjectByAPIKey,
};
