import { Request, Response } from "express";
import { customerServices } from "../db/services/customer";

export const getCustomerById = async (
	req: Request & { user?: any },
	res: Response
) => {
	try {
		const { customer_id } = req.user;
		const customer = await customerServices.getCustomerById({
			customer_id,
		});

		if (!customer) {
			return res
				.status(404)
				.json({ message: "Customer not found", success: false });
		}

		res.status(200).json({ customer, success: true });
	} catch (error) {
		console.log(`Error in getting customer by id: ${error}`);
		res.status(500).json({
			message: "Internal Server Error",
			success: false,
		});
	}
};

export const generateAPIKey = async (
	req: Request & { user?: any },
	res: Response
) => {
	try {
		const { customer_id } = req.user;
		const customer = await customerServices.getCustomerById({
			customer_id,
		});
		if (customer?.api_key) {
			return res.status(400).json({
				message: "API key already exists",
				api_key: customer.api_key,
				success: false,
			});
		}

		const apiKey = await customerServices.generateAPIKey({
			customer_id,
		});
		return res.status(200).json({
			message: "API key generated successfully",
			api_key: apiKey,
			success: true,
		});
	} catch (error) {
		console.log(`Error in generating API key: ${error}`);
		res.status(500).json({
			message: "Internal Server Error",
			success: false,
		});
	}
};
