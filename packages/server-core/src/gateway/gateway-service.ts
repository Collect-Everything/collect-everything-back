import axios, { AxiosInstance } from "axios";
import { Gateway, SERVICES_CONFIG, Service } from "../config";
import { createGatewayApiKey } from "../helpers/api-key";
import { boldLog, orangeLog } from "../helpers/console";

export type GatewayServiceOptions = {
  gatewayName: Gateway;
  serviceName: Service;
};

export abstract class GatewayService {
  protected fetcher: AxiosInstance;

  constructor(
    protected readonly name: string,
    options: GatewayServiceOptions,
  ) {
    const secret = process.env[`${options.gatewayName}_SECRET`];

    if (!secret) {
      throw new Error(
        `Cannot instanciate GatewayService without ${options.gatewayName}_SECRET in env`,
      );
    }

    this.fetcher = axios.create({
      baseURL: this.getBaseURL(options.serviceName),
      headers: {
        "x-gateway": options.gatewayName,
        "x-api-key": createGatewayApiKey(options.gatewayName, secret),
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
            "[GatewayService]: Launching in production mode and missing SERVICES_HOST or SERVICES_PROTOCOL in env",
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
