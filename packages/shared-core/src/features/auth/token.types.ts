export type TokenRole =
  | "admin"
  | "company"
  | "company_user"
  | "company_customer";

export type CompanyUserTokenPayload = {
  sub: number;
  company_id: number;
  role: "company_user";
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
    | AdminTokenPayload
    | CompanyCustomerTokenPayload;
  iat: number;
  exp: number;
};
