import { Request } from "express";
import { CustomerModel, ProjectModel } from "./models";

export interface AuthenticatedRequest extends Request {
	customer?: CustomerModel;
}

export type CustomerEmailInput = {
	email: string;
};
export type CustomerIdInput = {
	customer_id: string;
};
export type CustomerServiceOutput = Promise<CustomerModel | undefined>;
export type CustomerAPIKeyOutput = Promise<string | undefined>;

export type CreateProjectInput = {
	project_name: string;
	customer_id: string;
};
export type ProjectServiceOutput = Promise<ProjectModel | undefined>;
