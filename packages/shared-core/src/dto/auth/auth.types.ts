export const USER_TYPES = ["admin", "company_user", "client"] as const;
export type UserType = (typeof USER_TYPES)[number];
