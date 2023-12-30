import { Request, Response } from "express";
import { customerServices } from "../db/services/customer";
import { tokenHelpers } from "../utils/tokens";
import { validators } from "../utils/validators";

export const login = async (req: Request, res: Response) => {
	try {
		const { email } = req.body;
		if (!validators.validateEmail(email)) {
			return res
				.status(400)
				.json({ message: "Invalid email", success: false });
		}

		let customer = await customerServices.checkIfCustomerExists({
			email,
		});
		if (!customer) {
			customer = await customerServices.createNewCustomer({ email });
		}

		const token = tokenHelpers.generateJwtToken({
			email: customer.email,
			customer_id: customer.customer_id,
		});
		res.cookie("token", token);
		res.status(200).json({ message: "Login successful", success: true });
	} catch (error) {
		console.error(`Error in login: ${error}`);
		res.status(500).json({
			message: "Internal server error",
			success: false,
		});
	}
};
