import { z } from "zod";

export const CreateCompanyCustomerDto = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
  firstname: z.string(),
  lastname: z.string(),
  company_id: z.number(),
});

export type CreateCompanyCustomerDto = z.infer<typeof CreateCompanyCustomerDto>;
