import "dotenv/config";
import "./env";
import { createServiceApp } from "@ce/server-core";
import { createApiRouter } from "./lib/router";
import { apiConfig } from "./config/api.config";
import { redisClient } from "./lib/redis";

const app = createServiceApp("EMAIL_VALIDATION", createApiRouter, apiConfig);

redisClient.connect().then(() => {
  console.info("Redis connected");
});

redisClient.on("error", (err) => {
  console.error(`Redis Client Error:`, err);
});

app.start();
