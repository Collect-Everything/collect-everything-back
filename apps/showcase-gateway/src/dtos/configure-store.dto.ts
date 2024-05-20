import z from "zod";

export const ConfigureStoreDTOSchema = z.object({
  storeName: z.string(),
  color: z.string().optional(),
  logo: z.string().optional(),
  keyPhrases: z.record(z.string()).optional(),
  productsType: z.string().optional(),
  phoneContact: z.string().optional(),
  emailContact: z.string().optional(),
  links: z.record(z.string()).optional(),
  externalUrl: z.string().optional(),
});

export type ConfigureStoreDTO = z.infer<typeof ConfigureStoreDTOSchema>;
