import jwt from "jsonwebtoken";

const generateJwtToken = (payload: { email: string; customer_id: string }) => {
	const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
		expiresIn: "30d",
	});
	return token;
};

const verifyJwtToken = (token: string) => {
	try {
		if (!token) return null;
		return jwt.verify(token, process.env.JWT_SECRET as string);
	} catch (error) {
		if (error instanceof jwt.TokenExpiredError) {
			return "expired";
		}
		return null;
	}
};

export const tokenHelpers = {
	generateJwtToken,
	verifyJwtToken,
};
