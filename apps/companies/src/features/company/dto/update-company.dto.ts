import { z } from "zod";

export const UpdateCompanySchema = z.object({
  id: z.number(),
  name: z.string(),
  phone: z.string(),
  email: z.string().email(),
  address_label: z.string(),
  street: z.string(),
  street_number: z.string(),
  postal_code: z.string(),
  city: z.string(),
  country: z.string(),
  password: z.string(),
});

export type UpdateCompany = z.infer<typeof UpdateCompanySchema>;
