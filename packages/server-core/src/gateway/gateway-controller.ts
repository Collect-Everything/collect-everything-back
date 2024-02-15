import axios, { AxiosInstance } from "axios";
import { SERVICES_CONFIG, Service } from "../config";
import { boldLog, orangeLog } from "../helpers/console";
import { createGatewayApiKey } from "../helpers/api-key";

export type GatewayControllerOptions = {
  service: Service;
};

export abstract class GatewayController {
  protected fetcher: AxiosInstance;

  constructor(options: GatewayControllerOptions) {
    const secret = process.env[`ADMIN_GATEWAY_SECRET`];

    if (!secret) {
      throw new Error(
        "Cannot instanciate GatewayController without ADMIN_GATEWAY_SECRET in env",
      );
    }

    this.fetcher = axios.create({
      baseURL: this.getBaseURL(options.service),
      headers: {
        "x-gateway": "ADMIN_GATEWAY",
        "x-api-key": createGatewayApiKey("ADMIN_GATEWAY", secret),
      },
    });
  }

  private getEnvConfig() {
    const protocol = process.env.SERVICES_PROTOCOL;
    const host = process.env.SERVICES_HOST;

    if (process.env.NODE_ENV !== "development" && (!protocol || !host)) {
      console.warn(
        boldLog(
          orangeLog(
            "[GatewayController]: Launching in production mode and missing SERVICES_HOST or SERVICES_PROTOCOL in env",
          ),
        ),
      );
    }

    return {
      protocol: protocol || "http",
      host: host || "localhost",
    };
  }
  private getBaseURL(service: Service) {
    const { protocol, host } = this.getEnvConfig();
    const config = SERVICES_CONFIG[service];

    return `${protocol}://${host}:${config.port}${config.basePath || ""}`;
  }
}
