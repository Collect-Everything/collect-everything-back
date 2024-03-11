import "dotenv/config";
import "./env";
import { createGatewayApp } from "@ce/server-core";
import { createApiRouter } from "./lib/router";
import { db } from "./lib/db";
import { apiConfig } from "./config/api.config";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

if (process.env.NODE_ENV !== "test") {
  db.connectWithRetry();
}

const app = createGatewayApp("SHOWCASE_GATEWAY", createApiRouter, apiConfig);

const options = {
  definition: {
    failOnErrors: true,
    openapi: "3.0.0",
    info: {
      title: "Collect&Verything - Showcase Gateway",
      version: "0.0.1",
    },
    servers: [
      {
        url: `${apiConfig.baseUrl}${apiConfig.apiPath.slice(1)}`,
      },
    ],
  },
  apis: ["./**/*.controller.ts"], // files containing annotations as above
};

const openapiSpecification = swaggerJsDoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.start();
