import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const dbConnectionPool = new Pool({
	host: process.env.POSTGRES_HOST,
	user: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	database: process.env.POSTGRES_DB,
	port: 5432,
	max: 10,
	idleTimeoutMillis: 30000,
});

export default dbConnectionPool;
