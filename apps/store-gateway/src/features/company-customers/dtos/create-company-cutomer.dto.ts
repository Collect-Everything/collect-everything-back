import z from 'zod';

export const CreateCompanyCustomerDTOSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
  firstname: z.string(),
  lastname: z.string(),
  companyId: z.string()
});

export type CreateCompanyCustomerDTO = z.infer<
  typeof CreateCompanyCustomerDTOSchema
>;
