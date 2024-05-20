import "dotenv/config";
import "./env";
import { createServiceApp } from "@ce/server-core";
import { createApiRouter } from "./lib/router";
import { apiConfig } from "./config/api.config";

const app = createServiceApp("ADMINS", createApiRouter, apiConfig);

app.start();
