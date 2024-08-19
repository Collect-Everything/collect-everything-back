import {
  ProductConditioningSchema,
  ProductSizeSchema,
  ProductUnitySchema
} from '@ce/shared-core';
import { z } from 'zod';

export const CreateProductDtoSchema = z.object({
  categoryId: z.string(),

  name: z.string(),
  price: z.number(),
  description: z.string().optional(),
  image: z.string().optional(),
  stock: z.number(),
  conditioning: ProductConditioningSchema,
  unity: ProductUnitySchema,
  size: ProductSizeSchema.optional()
});

export type CreateProductDto = z.infer<typeof CreateProductDtoSchema>;
