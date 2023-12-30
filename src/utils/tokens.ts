import jwt from "jsonwebtoken";

const generateJwtToken = (payload: { email: string; customer_id: string }) => {
	const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
		expiresIn: "30d",
	});
	return token;
};

const verifyJwtToken = (token: string) => {
	return jwt.verify(token, process.env.JWT_SECRET as string);
};

export const tokenHelpers = {
	generateJwtToken,
	verifyJwtToken,
};
