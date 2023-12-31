import { Response } from "express";
import { customerServices } from "../db/services/customer";
import { AuthenticatedRequest } from "../types/common";

const getCustomerById = async (req: AuthenticatedRequest, res: Response) => {
	try {
		const { customer_id } = req?.customer!;
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

export const customerControllers = {
	getCustomerById,
};
