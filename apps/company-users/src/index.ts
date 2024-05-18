import "dotenv/config";
import "./env";
import { createServiceApp } from "@ce/server-core";
import { createApiRouter } from "./lib/router";
import { apiConfig } from "./config/api.config";

export const app = createServiceApp(
  "COMPANY_USERS",
  createApiRouter,
  apiConfig,
);

app.start();
