import dbConnectionPool from "../connection";

const checkIfCustomerExists = async ({ email }: { email: string }) => {
	const result = await dbConnectionPool.query(
		`SELECT * FROM customers WHERE email = $1`,
		[email]
	);
	return result?.rows[0];
};

const createNewCustomer = async ({ email }: { email: string }) => {
	const result = await dbConnectionPool.query(
		`INSERT INTO customers(email) VALUES($1) RETURNING *`,
		[email]
	);
	return result?.rows[0];
};

const getCustomerById = async ({ customer_id }: { customer_id: string }) => {
	const result = await dbConnectionPool.query(
		`SELECT * FROM customers WHERE customer_id = $1`,
		[customer_id]
	);
	return result?.rows[0];
};

const generateAPIKey = async ({ customer_id }: { customer_id: string }) => {
	const result = await dbConnectionPool.query(
		`UPDATE customers SET api_key = gen_random_uuid() WHERE customer_id = $1 RETURNING api_key`,
		[customer_id]
	);
	return result?.rows[0]?.api_key;
};

export const customerServices = {
	checkIfCustomerExists,
	createNewCustomer,
	getCustomerById,
	generateAPIKey,
};
