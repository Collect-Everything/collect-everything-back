import { ApiConfig } from "@ce/shared-core";
import { env } from "../env";

export const apiConfig = {
  baseUrl: `http://localhost:${env.port}/`,
  apiPath: "/api/v1",
} satisfies ApiConfig;

export const STATIC_PATH = "/static";

export const __PROD__ = env.nodeEnv === "production";
export const __DEV__ = env.nodeEnv === "development";
