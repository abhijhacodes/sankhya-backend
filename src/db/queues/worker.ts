import { Worker } from "bullmq";
import dotenv from "dotenv";
import { eventControllers } from "../../controllers/event";
import IORedis from "ioredis";

dotenv.config();

const connection = new IORedis(process.env.REDIS_SECURE_URL!, {
	maxRetriesPerRequest: null,
});

const worker = new Worker("events", eventControllers.processAndStoreEvent, {
	connection,
});

worker.on("ready", () => {
	console.log("Worker is ready");
});

worker.on("closed", () => {
	console.log("Worker is closed");
});
