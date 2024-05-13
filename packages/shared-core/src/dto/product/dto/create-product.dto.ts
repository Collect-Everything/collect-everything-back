import { z } from "zod";

export const CreateProductDto = z.object({
  name: z.string(),
  price: z.number(),
  description: z.string(),
  photo: z.string(),
  conditioning: z.string(),
  size: z.string(),
  stock: z.number(),
  unity: z.string(),
  category_id: z.number(),
  parent_id: z.number(),
});

export type CreateProductDto = z.infer<typeof CreateProductDto>;