import { ApiConfig } from "@ce/shared-core";
import { env } from "../env";
import { SERVICES_CONFIG } from "@ce/server-core";

export const apiConfig = {
  baseUrl: `http://localhost:${SERVICES_CONFIG.EMAIL_VALIDATION.port}/`,
  apiPath: "/api/v1",
} satisfies ApiConfig;

export const STATIC_PATH = "/static";

export const __PROD__ = env.nodeEnv === "production";
export const __DEV__ = env.nodeEnv === "development";
