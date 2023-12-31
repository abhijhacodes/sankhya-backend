export interface CustomerModel {
	customer_id: string;
	email: string;
	created_at: Date;
}

export interface ProjectModel {
	project_id: string;
	project_name: string;
	api_key: string;
	customer_id: string;
	created_at: Date;
}
