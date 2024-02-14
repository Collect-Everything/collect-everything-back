export const ADMIN_GATEWAY = Symbol("ADMIN_GATEWAY");

export const SHOWCASE_GATEWAY = Symbol("SHOWCASE_GATEWAY");

export const STORE_GATEWAY = Symbol("STORE_GATEWAY");

export const GATEWAYS = {
  ADMIN_GATEWAY,
  SHOWCASE_GATEWAY,
  STORE_GATEWAY,
};

export type Gateway = keyof typeof GATEWAYS;
