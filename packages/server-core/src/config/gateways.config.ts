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
    port: 3100,
  },
  SHOWCASE_GATEWAY: {
    port: 3101,
  },
  STORE_GATEWAY: {
    port: 3102,
  },
};
