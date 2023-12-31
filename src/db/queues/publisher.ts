import { Queue } from "bullmq";

const publisher = new Queue("events", {
	connection: {
		host: process.env.REDIS_HOST,
		port: parseInt(process.env.REDIS_PORT as string),
	},
});

export default publisher;
