import { OrderStatus, PaginatedQuerySchema } from '@ce/shared-core';
import { z } from 'zod';

export const ListQueryDto = PaginatedQuerySchema.extend({
  customerId: z.string().optional(),
  statuses: z.array(OrderStatus).optional()
});

export type ListQueryDto = z.infer<typeof ListQueryDto>;
