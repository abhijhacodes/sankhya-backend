import dbConnectionPool from "../connection";
import {
	CreateProjectInput,
	CustomerIdInput,
	ProjectAPIKeyInput,
	ProjectAPIKeyOutput,
	ProjectServiceOutput,
} from "../../types/common";

const getProjectByCustomerId = async ({
	customer_id,
}: CustomerIdInput): ProjectServiceOutput => {
	const result = await dbConnectionPool.query(
		`SELECT * FROM projects WHERE customer_id = $1`,
		[customer_id]
	);
	return result?.rows[0];
};

const createNewProject = async ({
	customer_id,
	project_name,
	project_client_url,
}: CreateProjectInput): ProjectServiceOutput => {
	const result = await dbConnectionPool.query(
		`INSERT INTO projects(project_name, project_client_url, customer_id) VALUES($1, $2, $3) RETURNING *`,
		[project_name, project_client_url, customer_id]
	);
	return result?.rows[0];
};

const getProjectByAPIKey = async ({
	api_key,
}: ProjectAPIKeyInput): ProjectAPIKeyOutput => {
	const result = await dbConnectionPool.query(
		`SELECT project_id, project_client_url FROM projects WHERE api_key = $1`,
		[api_key]
	);
	return result?.rows[0];
};

export const projectServices = {
	createNewProject,
	getProjectByCustomerId,
	getProjectByAPIKey,
};
