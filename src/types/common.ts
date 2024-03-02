import { Request } from "express";
import { CustomerModel, ProjectModel } from "./models";

export interface AuthenticatedRequest extends Request {
	customer?: CustomerModel;
}
export interface EventCaptureRequest extends Request {
	project_id?: string;
}

export type CustomerEmailInput = {
	email: string;
};
export type CustomerIdInput = {
	customer_id: string;
};
export type CustomerServiceOutput = Promise<CustomerModel | undefined>;

export type CreateProjectInput = {
	customer_id: string;
	project_name: string;
	project_client_url: string;
};
export type ProjectAPIKeyInput = {
	api_key: string;
};
export type ProjectServiceOutput = Promise<ProjectModel | undefined>;
export type ProjectAPIKeyOutput = Promise<Partial<ProjectModel> | undefined>;

export type CreateEventInput = {
	project_id: string;
	city: string;
	state: string;
	country: string;
	screen_resolution: string;
	operating_system: string;
};

export type GeolocationDetails = {
	city: string;
	state: string;
	country: string;
};
export type GeolocationResponse = Promise<GeolocationDetails>;

export type AnalyticsServiceInput = {
	project_ids: string[];
	start_date: string;
	end_date: string;
};

export type TrafficTrendOutput = {
	period: string;
	total_visitors: string;
}[];
