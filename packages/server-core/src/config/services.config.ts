import { getPortFromEnv } from "../helpers/env";
import { Gateway } from "./gateways.config";

interface ServiceConfig {
  port: number;
  basePath?: string;
  allowedGateways: Gateway[];
}

const SERVICES = [
  "ADMINS",
  "COMPANY_USERS",
  "COMPANY_INVOICES",
  "COMPANIES",
  "PRODUCTS",
  "COMPANY_CUSTOMERS",
  "COMPANY_CUSTOMERS_INVOICES",
  "CART_AND_ORDERS",
  "ACCESS_TOKEN",
  "EMAIL_VALIDATION",
] as const;

export type Service = (typeof SERVICES)[number];

export const SERVICES_CONFIG: Record<Service, ServiceConfig> = {
  ADMINS: {
    port: getPortFromEnv("ADMINS"),
    basePath: "/api/v1",
    allowedGateways: ["ADMIN_GATEWAY"],
  },
  COMPANY_USERS: {
    port: getPortFromEnv("COMPANY_USERS"),
    basePath: "/api/v1",
    allowedGateways: ["ADMIN_GATEWAY", "SHOWCASE_GATEWAY"],
  },
  COMPANY_INVOICES: {
    port: getPortFromEnv("COMPANY_INVOICES"),
    basePath: "/api/v1",
    allowedGateways: ["ADMIN_GATEWAY", "SHOWCASE_GATEWAY"],
  },
  COMPANIES: {
    port: getPortFromEnv("COMPANIES"),
    basePath: "/api/v1",
    allowedGateways: ["ADMIN_GATEWAY", "SHOWCASE_GATEWAY"],
  },
  PRODUCTS: {
    port: getPortFromEnv("PRODUCTS"),
    basePath: "/api/v1",
    allowedGateways: ["ADMIN_GATEWAY", "SHOWCASE_GATEWAY", "STORE_GATEWAY"],
  },
  COMPANY_CUSTOMERS: {
    port: getPortFromEnv("COMPANY_CUSTOMERS"),
    basePath: "/api/v1",
    allowedGateways: ["ADMIN_GATEWAY", "SHOWCASE_GATEWAY", "STORE_GATEWAY"],
  },
  COMPANY_CUSTOMERS_INVOICES: {
    port: getPortFromEnv("COMPANY_CUSTOMERS_INVOICES"),
    basePath: "/api/v1",
    allowedGateways: ["ADMIN_GATEWAY", "SHOWCASE_GATEWAY", "STORE_GATEWAY"],
  },
  CART_AND_ORDERS: {
    port: getPortFromEnv("CART_AND_ORDERS"),
    basePath: "/api/v1",
    allowedGateways: ["ADMIN_GATEWAY", "SHOWCASE_GATEWAY", "STORE_GATEWAY"],
  },
  ACCESS_TOKEN: {
    port: getPortFromEnv("ACCESS_TOKEN"),
    basePath: "/api/v1",
    allowedGateways: ["ADMIN_GATEWAY", "SHOWCASE_GATEWAY", "STORE_GATEWAY"],
  },
  EMAIL_VALIDATION: {
    port: getPortFromEnv("EMAIL_VALIDATION"),
    basePath: "/api/v1",
    allowedGateways: ["ADMIN_GATEWAY", "SHOWCASE_GATEWAY", "STORE_GATEWAY"],
  },
};
