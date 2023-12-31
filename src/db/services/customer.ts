import dbConnectionPool from "../connection";
import {
	CustomerEmailInput,
	CustomerIdInput,
	CustomerServiceOutput,
} from "../../types/common";

const checkIfCustomerExists = async ({
	email,
}: CustomerEmailInput): CustomerServiceOutput => {
	const result = await dbConnectionPool.query(
		`SELECT * FROM customers WHERE email = $1`,
		[email]
	);
	return result?.rows[0];
};

const createNewCustomer = async ({
	email,
}: CustomerEmailInput): CustomerServiceOutput => {
	const result = await dbConnectionPool.query(
		`INSERT INTO customers(email) VALUES($1) RETURNING *`,
		[email]
	);
	return result?.rows[0];
};

const getCustomerById = async ({
	customer_id,
}: CustomerIdInput): CustomerServiceOutput => {
	const result = await dbConnectionPool.query(
		`SELECT * FROM customers WHERE customer_id = $1`,
		[customer_id]
	);
	return result?.rows[0];
};

export const customerServices = {
	checkIfCustomerExists,
	createNewCustomer,
	getCustomerById,
};
