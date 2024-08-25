import {
  ProductConditioningSchema,
  ProductSizeSchema,
  ProductUnitySchema
} from '@ce/shared-core';
import { z } from 'zod';

export const UpdateProductDtoSchema = z.object({
  name: z.string().optional(),
  price: z.number().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  stock: z.number().optional(),
  conditioning: ProductConditioningSchema.optional(),
  unity: ProductUnitySchema.optional(),
  size: ProductSizeSchema.optional()
});

export type UpdateProductDto = z.infer<typeof UpdateProductDtoSchema>;
