import z from 'zod';

export const ConfigureStoreDTOSchema = z.object({
  storeName: z.string().optional(),
  color: z.string().optional(),
  logo: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  button: z.string().optional(),
  image: z.string().optional(),
  advantages: z
    .array(
      z.object({
        title: z.string(),
        description: z.string(),
        icon: z.string().optional()
      })
    )
    .optional(),
  productsType: z.string().optional(),
  phoneContact: z.string().optional(),
  emailContact: z.string().optional(),
  instagramUrl: z.string().optional(),
  facebookUrl: z.string().optional(),
  twitterUrl: z.string().optional(),
  externalUrl: z.string().optional()
});

export type ConfigureStoreDTO = z.infer<typeof ConfigureStoreDTOSchema>;
