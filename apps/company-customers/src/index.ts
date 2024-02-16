import "dotenv/config";
import "./env";
import { createServiceApp } from "@ce/server-core";
import { createApiRouter } from "./lib/router";
import { db } from "./lib/db";
import { apiConfig } from "./config/api.config";

if (process.env.NODE_ENV !== "test") {
  db.connectWithRetry();
}

export const app = createServiceApp(
  "COMPANY_CUSTOMERS",
  createApiRouter,
  apiConfig
);

app.start();
