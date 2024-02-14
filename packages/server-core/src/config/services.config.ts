import { Gateway } from "../types";

interface ServiceConfig {
  port: number;
  allowedGateways: Gateway[];
}

const SERVICES = [
  "ADMINS",
  "CUSTOMERS",
  "CUSTOMERS_INVOICE",
  "COMPANY_AND_STORES",
  "PRODUCTS",
  "FINAL_CUSTOMERS",
  "FINAL_CUSTOMERS_INVOICE",
  "CART_AND_ORDERS",
] as const;

export type Service = (typeof SERVICES)[number];

export const SERVICES_CONFIG: Record<Service, ServiceConfig> = {
  ADMINS: {
    port: 3001,
    allowedGateways: ["ADMIN_GATEWAY"],
  },
  CUSTOMERS: {
    port: 3002,
    allowedGateways: ["ADMIN_GATEWAY", "SHOWCASE_GATEWAY"],
  },
  CUSTOMERS_INVOICE: {
    port: 3003,
    allowedGateways: ["ADMIN_GATEWAY", "SHOWCASE_GATEWAY"],
  },
  COMPANY_AND_STORES: {
    port: 3004,
    allowedGateways: ["ADMIN_GATEWAY", "SHOWCASE_GATEWAY"],
  },
  PRODUCTS: {
    port: 3005,
    allowedGateways: ["ADMIN_GATEWAY", "SHOWCASE_GATEWAY", "STORE_GATEWAY"],
  },
  FINAL_CUSTOMERS: {
    port: 3006,
    allowedGateways: ["ADMIN_GATEWAY", "SHOWCASE_GATEWAY", "STORE_GATEWAY"],
  },
  FINAL_CUSTOMERS_INVOICE: {
    port: 3007,
    allowedGateways: ["ADMIN_GATEWAY", "SHOWCASE_GATEWAY", "STORE_GATEWAY"],
  },
  CART_AND_ORDERS: {
    port: 3008,
    allowedGateways: ["ADMIN_GATEWAY", "SHOWCASE_GATEWAY", "STORE_GATEWAY"],
  },
};
