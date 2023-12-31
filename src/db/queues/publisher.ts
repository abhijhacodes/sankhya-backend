import { Queue } from "bullmq";

const publisher = new Queue("events", {
	connection: {
		host: process.env.REDIS_HOST,
		port: 6379,
	},
});

export default publisher;
