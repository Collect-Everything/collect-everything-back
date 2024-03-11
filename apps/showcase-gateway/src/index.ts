import "dotenv/config";
import "./env";
import { createGatewayApp } from "@ce/server-core";
import { createApiRouter } from "./lib/router";
import { db } from "./lib/db";
import { apiConfig } from "./config/api.config";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

if (process.env.NODE_ENV !== "test") {
  db.connectWithRetry();
}

const app = createGatewayApp("SHOWCASE_GATEWAY", createApiRouter, apiConfig);

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Collect&Verything API - Showcase Gateway",
      version: "0.0.1",
      description:
        "La Showcase Gateway fait le lien entre le site vitrine et les microservices de Collect&Verything",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
    },
    servers: [
      {
        url: "http://localhost:3101",
      },
    ],
  },
  apis: ["./features/customers/*.js"],
};

const specs = swaggerJsdoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.start();
