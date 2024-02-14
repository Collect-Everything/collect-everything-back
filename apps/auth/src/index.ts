import "dotenv/config";
import "./env";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import hpp from "hpp";
import helmet from "helmet";
import { __DEV__, __PROD__ } from "./config/api.config";
import { globalErrorHandler, limiter } from "@ce/server-core";
import { createApiRouter } from "./lib/router";
import { db } from "./lib/db";

if (process.env.NODE_ENV !== "test") {
  db.dbConnectWithRetry();
}

const app = express();

//if (apiConfig.uploads.source === "local") {
//  app.use(apiConfig.uploads.source, express.static(STATIC_PATH));
//}

app.use(cors());
app.use(helmet());
app.use(morgan(__DEV__ ? "dev" : "common"));
app.use(limiter); // Rate limiter
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "100mb" }));
app.use(hpp());

createApiRouter(app);

app.use(globalErrorHandler);

export default app;
