import "dotenv/config";
import "./env";
import { createGatewayApp } from "@ce/server-core";
import { createApiRouter } from "./lib/router";
import { apiConfig } from "./config/api.config";
import { eventsHandler } from "./lib/events";

const app = createGatewayApp("SHOWCASE_GATEWAY", createApiRouter, apiConfig);

eventsHandler.init();

app.start();
