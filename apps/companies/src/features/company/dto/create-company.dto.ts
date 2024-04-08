import { z } from "zod";

export const CreateCompanySchema = z.object({
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

export type CreateCompany = z.infer<typeof CreateCompanySchema>;
