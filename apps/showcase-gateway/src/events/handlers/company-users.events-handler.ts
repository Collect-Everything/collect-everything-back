import { Handler } from ".";

export const COMPANY_USER_CREATED = "company-user/created";

export type CompanyUserCreatedPayload = {
  email: string;
};

export const registerCompanyUsersEvents: Handler = (service) => {
  service.on(
    COMPANY_USER_CREATED,
    async (payload: CompanyUserCreatedPayload) => {
      console.log(`Company user created: ${payload.email}`);
    },
  );
};
