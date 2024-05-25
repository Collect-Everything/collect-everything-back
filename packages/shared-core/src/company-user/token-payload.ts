import { z } from "zod";

export const CompanyUserTokenPayloadSchema = z.object({
  id: z.string(),
  companyId: z.string(),
  role: z.string(),
  email: z.string(),
  firstname: z.string(),
  lastname: z.string(),
});

export type CompanyUserTokenPayload = z.infer<
  typeof CompanyUserTokenPayloadSchema
>;
