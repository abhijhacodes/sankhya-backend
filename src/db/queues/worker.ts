import { Worker } from "bullmq";
import dotenv from "dotenv";
import { eventControllers } from "../../controllers/event";

dotenv.config();

const worker = new Worker("events", eventControllers.processAndStoreEvent, {
	connection: {
		host: process.env.REDIS_HOST,
		port: parseInt(process.env.REDIS_PORT as string),
	},
});

worker.on("ready", () => {
	console.log("Worker is ready");
});

worker.on("closed", () => {
	console.log("Worker is closed");
});
