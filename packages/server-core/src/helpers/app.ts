import express, { Express } from "express";
import { GATEWAYS_CONFIG, SERVICES_CONFIG, Service } from "../config";
import cors from "cors";
import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";
import {
  limiter,
  globalErrorHandler,
  gatewaysApiKeyMiddleware,
  jwtMiddleware,
} from "../middlewares";
import { ApiConfig } from "@ce/shared-core";
import { blueLog, boldLog, greenLog } from "./console";
import { Gateway } from "../config";

const __DEV__ = process.env.NODE_ENV === "development";

const applyCommonMiddlewares = (app: Express) => {
  app.use(cors());
  app.use(helmet());
  app.use(morgan(__DEV__ ? "dev" : "common"));
  app.use(limiter); // Rate limiter
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json({ limit: "100mb" }));
  app.use(hpp());
  app.use(jwtMiddleware);
};

export const createServiceApp = (
  service: Service,
  createApiRouter: (app: Express) => void,
  apiConfig: ApiConfig,
) => {
  const app = express();

  if (apiConfig.uploads?.source === "local") {
    app.use(apiConfig.uploads.source, express.static("/static"));
  }

  app.use(gatewaysApiKeyMiddleware(SERVICES_CONFIG[service].allowedGateways)); // Gateway middleware
  applyCommonMiddlewares(app);

  createApiRouter(app);

  app.get("/ping", (_req, res) => res.status(200).send("API OK !"));

  app.use(globalErrorHandler);

  return {
    ...app,
    start: () => {
      return app.listen(SERVICES_CONFIG[service].port, () => {
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

export const createGatewayApp = (
  gateway: Gateway,
  createApiRouter: (app: Express) => void,
  apiConfig: ApiConfig,
) => {
  const app = express();

  applyCommonMiddlewares(app);

  createApiRouter(app);

  app.get("/ping", (_req, res) => res.status(200).send("API OK !"));

  app.use(globalErrorHandler);

  return {
    ...app,
    start: () => {
      return app.listen(GATEWAYS_CONFIG[gateway].port, () => {
        console.log(
          boldLog(
            blueLog(
              `Gateway ${gateway} is running on port ${GATEWAYS_CONFIG[gateway].port}`,
            ),
          ),
        );
      });
    },
  };
};
