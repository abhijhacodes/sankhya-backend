import { Queue } from "bullmq";
import IORedis from "ioredis";

const connection = new IORedis(process.env.REDIS_SECURE_URL!, {
	maxRetriesPerRequest: null,
});

const publisher = new Queue("events", {
	connection,
});

export default publisher;
