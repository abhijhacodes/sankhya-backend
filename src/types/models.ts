export interface CustomerModel {
	customer_id: string;
	email: string;
	created_at: Date;
}

export interface ProjectModel {
	project_id: string;
	project_name: string;
	project_client_url: string;
	api_key: string;
	customer_id: string;
	created_at: Date;
}

export interface EventModel {
	event_id: string;
	project_id: string;
	city: string;
	state: string;
	country: string;
	created_at: Date;
}
