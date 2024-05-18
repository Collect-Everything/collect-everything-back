import "dotenv/config";
import "./env";
import { createServiceApp } from "@ce/server-core";
import { createApiRouter } from "./lib/router";
import { apiConfig } from "./config/api.config";
import { redisClient } from "./lib/redis";
import { logger } from "@ce/logger";

const app = createServiceApp("EMAIL_VALIDATION", createApiRouter, apiConfig);

redisClient.connect().then(() => {
  logger.info("Redis connected");
});

redisClient.on("error", (err) => {
  logger.error(`Redis Client Error: ${err}`);
});

app.start();
