export type TokenRole =
  | "admin"
  | "company"
  | "company_user"
  | "company_customer";

export type CompanyUserTokenPayload = {
  sub: number;
  role: "company_user";
};

export type CompanyTokenPayload = {
  sub: number;
  role: "company";
};

export type AdminTokenPayload = {
  sub: number;
  role: "admin";
};

export type CompanyCustomerTokenPayload = {
  sub: number;
  role: "company_customer";
};

export type TokenData = {
  data:
    | CompanyUserTokenPayload
    | CompanyTokenPayload
    | AdminTokenPayload
    | CompanyCustomerTokenPayload;
  iat: number;
  exp: number;
};
