import { ApiConfig } from "@ce/shared-core";
import { env } from "../env";
import { GATEWAYS_CONFIG } from "@ce/server-core";

export const apiConfig = {
  baseUrl: `http://${env.gatewaysHost}:${GATEWAYS_CONFIG.STORE_GATEWAY.port}/`,
  apiPath: "/api/v1",
} satisfies ApiConfig;

export const __PROD__ = env.nodeEnv === "production";
export const __DEV__ = env.nodeEnv === "development";
