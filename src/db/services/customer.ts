import dbConnectionPool from "../connection";

const checkIfCustomerExists = async ({ email }: { email: string }) => {
	const result = await dbConnectionPool.query(
		`SELECT * FROM customers WHERE email = $1`,
		[email]
	);
	return result.rows[0];
};

const createNewCustomer = async ({ email }: { email: string }) => {
	const results = await dbConnectionPool.query(
		`INSERT INTO customers(email) VALUES($1) RETURNING *`,
		[email]
	);
	return results.rows[0];
};

export const customerServices = {
	checkIfCustomerExists,
	createNewCustomer,
};
