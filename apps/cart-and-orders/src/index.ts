import "dotenv/config";
import "./env";
import { createServiceApp } from "@ce/server-core";
import { createApiRouter } from "./lib/router";
import { apiConfig } from "./config/api.config";

export const app = createServiceApp(
  "CART_AND_ORDERS",
  createApiRouter,
  apiConfig,
);

app.start();
