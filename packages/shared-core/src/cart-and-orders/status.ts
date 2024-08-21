import { z } from 'zod';

export const ORDER_STATUS = ['PENDING', 'CONFIRMED', 'PICKED'] as const;
export const OrderStatus = z.enum(ORDER_STATUS);
export type OrderStatus = z.infer<typeof OrderStatus>;
