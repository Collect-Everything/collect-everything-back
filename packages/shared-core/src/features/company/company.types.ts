import { z } from "zod";

export const CompanyBaseSchema = z.object({
  name: z.string(),
  phone: z.string(),
  email: z.string().email(),
  address_label: z.string(),
  street: z.string(),
  street_number: z.string(),
  postal_code: z.string(),
  city: z.string(),
  country: z.string(),
  color: z.string(),
  logo: z.string(),
  key_phrases: z.record(z.string()),
  products_type: z.string(),
  siret: z.string(),
  phone_contact: z.string(),
  email_contact: z.string().email(),
  links: z.record(z.string()),
});

export const CompanySchema = CompanyBaseSchema.extend({
  id: z.number(),
  external_url: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type TCompanyBase = z.infer<typeof CompanyBaseSchema>;
export type TCompany = z.infer<typeof CompanySchema>;
