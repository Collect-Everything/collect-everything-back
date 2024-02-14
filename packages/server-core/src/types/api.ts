import { z } from "zod";
import { buildFilterQuery } from "../helpers/filters";
import { Filters } from "@ce/shared-core";

export type Params = { [key: string]: string };
export type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
export type SortOrder = 1 | -1;
export type Select = { [key: string]: number };
export type Sort = { [key: string]: SortOrder };
export type Query = { [key: string]: string };

export const ListQuery = z.object({
  offset: z.coerce.number().optional(),
  limit: z.coerce.number().optional(),
  sort: z
    .string()
    .optional()
    .transform((v): Record<string, SortOrder> | undefined => {
      if (!v) return undefined;
      return JSON.parse(v);
    }),
  select: z
    .string()
    .optional()
    .transform((v): Record<string, number> | undefined => {
      if (!v) return undefined;
      return JSON.parse(v);
    }),
  filters: z
    .string()
    .optional()
    .transform((v, ctx) => {
      if (!v) return undefined;
      const parsed = Filters.parse(JSON.parse(v));
      return buildFilterQuery(parsed);
    }),
  lang: z.string().optional(),
});

export type TListQuery = z.infer<typeof ListQuery>;
