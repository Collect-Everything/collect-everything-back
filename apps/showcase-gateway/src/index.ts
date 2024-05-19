import "dotenv/config";
import "./env";
import { createGatewayApp } from "@ce/server-core";
import { createApiRouter } from "./lib/router";
import { apiConfig } from "./config/api.config";

const app = createGatewayApp("SHOWCASE_GATEWAY", createApiRouter, apiConfig);

app.start();
