import { z } from 'zod';

export const CompanyCustomerTokenPayloadSchema = z.object({
  id: z.string(),
  companyId: z.string(),
  email: z.string(),
  firstname: z.string(),
  lastname: z.string()
});

export type CompanyCustomerTokenPayload = z.infer<
  typeof CompanyCustomerTokenPayloadSchema
>;
