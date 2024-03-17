import { Response } from "express";
import { AuthenticatedRequest } from "../types/common";
import { projectServices } from "../db/services/project";

const createNewProject = async (req: AuthenticatedRequest, res: Response) => {
	try {
		const { customer_id } = req?.customer!;
		const project = await projectServices.getProjectByCustomerId({
			customer_id,
		});

		if (project) {
			return res.status(400).json({
				message:
					"You already have a project, currently only one project is allowed.",
				project,
				success: false,
			});
		}

		const { project_name, project_client_url } = req.body;
		if (!project_name || !project_client_url) {
			return res.status(400).json({
				message: "Project name and client URL are required.",
				success: false,
			});
		}

		const newProject = await projectServices.createNewProject({
			customer_id,
			project_name,
			project_client_url,
		});
		return res.status(200).json({
			message: "New project created successfully",
			project: newProject,
			success: true,
		});
	} catch (error) {
		res.status(500).json({
			message: "Internal Server Error",
			success: false,
		});
	}
};

const getProjectDetails = async (req: AuthenticatedRequest, res: Response) => {
	try {
		const { customer_id } = req?.customer!;
		const project = await projectServices.getProjectByCustomerId({
			customer_id,
		});
		if (!project) {
			return res.status(200).json({
				message: "You don't have any project yet",
				success: true,
				project: null,
			});
		}
		return res.status(200).json({
			project,
			success: true,
		});
	} catch (error) {
		res.status(500).json({
			message: "Internal Server Error",
			success: false,
		});
	}
};

export const projectControllers = {
	createNewProject,
	getProjectDetails,
};
