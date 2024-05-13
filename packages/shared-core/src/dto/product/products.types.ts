import z from "zod";

export const ProductBaseSchema = z.object({
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
export const ProductSchema = ProductBaseSchema.extend({
  id: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  deleted_at: z.date(),
});

export type TProductBase = z.infer<typeof ProductBaseSchema>;
export type TProduct = z.infer<typeof ProductSchema>;
