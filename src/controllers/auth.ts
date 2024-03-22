import { Request, Response } from "express";
import { customerServices } from "../db/services/customer";
import { tokenHelpers } from "../utils/tokens";
import { validators } from "../utils/validators";

const login = async (req: Request, res: Response) => {
	try {
		const { email } = req.body;
		if (!validators.validateEmail(email!)) {
			return res.status(400).json({
				message: "Please provide a valid email ID",
				success: false,
			});
		}

		let customer = await customerServices.checkIfCustomerExists({
			email,
		});
		if (!customer) {
			customer = await customerServices.createNewCustomer({ email });
		}

		const token = tokenHelpers.generateJwtToken({
			email: customer?.email,
			customer_id: customer?.customer_id,
		});
		res.cookie("token", token, {
			path: "/",
			sameSite: "none",
			secure: false,
			httpOnly: true,
			expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
		});
		res.status(200).json({ message: "Login successful", success: true });
	} catch (error) {
		res.status(500).json({
			message: "Internal server error",
			success: false,
		});
	}
};

export const authControllers = {
	login,
};
