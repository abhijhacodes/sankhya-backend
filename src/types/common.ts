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
	project_name: string;
	customer_id: string;
};
export type ProjectAPIKeyInput = {
	api_key: string;
};
export type ProjectServiceOutput = Promise<ProjectModel | undefined>;
export type ProjectAPIKeyOutput = Promise<string | undefined>;
