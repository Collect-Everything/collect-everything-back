import { Gateway } from "./gateways.config";

interface ServiceConfig {
  port: number;
  basePath?: string;
  allowedGateways: Gateway[];
}

const SERVICES = [
  "AUTH",
  "ADMINS",
  "COMPANY_USERS",
  "COMPANIES_INVOICE",
  "COMPANIES_AND_STORES",
  "PRODUCTS",
  "COMPANY_CUSTOMERS",
  "COMPANY_CUSTOMERS_INVOICE",
  "CART_AND_ORDERS",
] as const;

export type Service = (typeof SERVICES)[number];

export const SERVICES_CONFIG: Record<Service, ServiceConfig> = {
  AUTH: {
    port: 3001,
    allowedGateways: ["ADMIN_GATEWAY", "SHOWCASE_GATEWAY", "STORE_GATEWAY"],
  },
  ADMINS: {
    port: 3002,
    basePath: "/api/v1",
    allowedGateways: ["ADMIN_GATEWAY"],
  },
  COMPANY_USERS: {
    port: 3003,
    basePath: "/api/v1",
    allowedGateways: ["ADMIN_GATEWAY", "SHOWCASE_GATEWAY"],
  },
  COMPANIES_INVOICE: {
    port: 3004,
    basePath: "/api/v1",
    allowedGateways: ["ADMIN_GATEWAY", "SHOWCASE_GATEWAY"],
  },
  COMPANIES_AND_STORES: {
    port: 3005,
    basePath: "/api/v1",
    allowedGateways: ["ADMIN_GATEWAY", "SHOWCASE_GATEWAY"],
  },
  PRODUCTS: {
    port: 3006,
    basePath: "/api/v1",
    allowedGateways: ["ADMIN_GATEWAY", "SHOWCASE_GATEWAY", "STORE_GATEWAY"],
  },
  COMPANY_CUSTOMERS: {
    port: 3007,
    basePath: "/api/v1",
    allowedGateways: ["ADMIN_GATEWAY", "SHOWCASE_GATEWAY", "STORE_GATEWAY"],
  },
  COMPANY_CUSTOMERS_INVOICE: {
    port: 3008,
    basePath: "/api/v1",
    allowedGateways: ["ADMIN_GATEWAY", "SHOWCASE_GATEWAY", "STORE_GATEWAY"],
  },
  CART_AND_ORDERS: {
    port: 3009,
    basePath: "/api/v1",
    allowedGateways: ["ADMIN_GATEWAY", "SHOWCASE_GATEWAY", "STORE_GATEWAY"],
  },
};
