import { z } from 'zod';

export const PaginatedQuerySchema = z.object({
  page: z.coerce.number().int().positive(),
  limit: z.coerce.number().int().positive()
});

export interface PaginatedQuery {
  page: number;
  limit: number;
}

export interface PaginatedParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
