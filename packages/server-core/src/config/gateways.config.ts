import { getPortFromEnv } from "../helpers/env";

interface GatewayConfig {
  port: number;
}
export const GATEWAYS = [
  "ADMIN_GATEWAY",
  "SHOWCASE_GATEWAY",
  "STORE_GATEWAY",
] as const;

export type Gateway = (typeof GATEWAYS)[number];

export const GATEWAYS_CONFIG: Record<Gateway, GatewayConfig> = {
  ADMIN_GATEWAY: {
    port: getPortFromEnv("ADMIN_GATEWAY"),
  },
  SHOWCASE_GATEWAY: {
    port: getPortFromEnv("SHOWCASE_GATEWAY"),
  },
  STORE_GATEWAY: {
    port: getPortFromEnv("STORE_GATEWAY"),
  },
};
