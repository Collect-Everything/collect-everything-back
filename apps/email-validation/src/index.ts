import "dotenv/config";
import "./env";
import { createServiceApp } from "@ce/server-core";
import { createApiRouter } from "./lib/router";
import { db } from "./lib/db";
import { apiConfig } from "./config/api.config";
import { redisClient } from "./lib/redis";
import { logger } from "@ce/logger";

if (process.env.NODE_ENV !== "test") {
  db.connectWithRetry();
}

const app = createServiceApp("EMAIL_VALIDATION", createApiRouter, apiConfig);

redisClient.connect().then(() => {
  logger.info("Redis connected");
});

redisClient.on("error", (err) => {
  logger.error(`Redis Client Error: ${err}`);
});

app.start();
