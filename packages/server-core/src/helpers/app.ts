import express, { Express } from "express";
import { SERVICES_CONFIG, Service } from "../config";
import cors from "cors";
import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";
import {
  limiter,
  globalErrorHandler,
  gatewaysMiddleware,
} from "../middlewares";
import { ApiConfig } from "@ce/shared-core";
import { boldLog, greenLog } from "./console";

const __DEV__ = process.env.NODE_ENV === "development";

export const createServiceApp = (
  service: Service,
  createApiRouter: (app: Express) => void,
  apiConfig: ApiConfig,
) => {
  const app = express();

  if (apiConfig.uploads?.source === "local") {
    app.use(apiConfig.uploads.source, express.static("/static"));
  }

  app.use(gatewaysMiddleware(SERVICES_CONFIG[service].allowedGateways)); // Gateway middleware
  app.use(cors());
  app.use(helmet());
  app.use(morgan(__DEV__ ? "dev" : "common"));
  app.use(limiter); // Rate limiter
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json({ limit: "100mb" }));
  app.use(hpp());

  createApiRouter(app);

  app.use(globalErrorHandler);

  return {
    ...app,
    start: () => {
      app.listen(SERVICES_CONFIG[service].port, () => {
        console.log(
          boldLog(
            greenLog(
              `Service ${service} is running on port ${SERVICES_CONFIG[service].port}`,
            ),
          ),
        );
      });
    },
  };
};
