import "dotenv/config";
import "./env";
import { createGatewayApp } from "@ce/server-core";
import { createApiRouter } from "./lib/router";
import { db } from "./lib/db";
import { apiConfig } from "./config/api.config";

if (process.env.NODE_ENV !== "test") {
  db.connectWithRetry();
}

const app = createGatewayApp("ADMIN_GATEWAY", createApiRouter, apiConfig);

app.start();
