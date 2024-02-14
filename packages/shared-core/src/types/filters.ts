import { z } from "zod";

const _OpItems = {
  GT: "$gt",
  GTE: "$gte",
  EQ: "$eq",
  NE: "$ne",
  LT: "$lt",
  LTE: "$lte",
} as const;

export const OP_ITEMS = Object.values(_OpItems);

export const OpItems = z.nativeEnum(_OpItems);

const _FilterType = {
  STRING: "string",
  DATE: "date",
  BOOLEAN: "boolean",
  NUMBER: "number",
  ENUM: "enum",
  ID: "_id",
  IN: "in",
  DATE_BETWEEN: "dateBetween",
} as const;

export const FilterType = z.nativeEnum(_FilterType);

const _FilterAssociation = {
  AND: "$and",
  OR: "$or",
} as const;

export const FilterAssociation = z.nativeEnum(_FilterAssociation);
export const Filter = z.object({
  id: z.string(),
  type: FilterType,
  path: z.string().optional(),
  value: z.any().optional(),
  op: OpItems.optional(),
  association: FilterAssociation.optional(),
});

export const Filters = Filter.array();

export type TFilter = z.infer<typeof Filter>;
export type TFilterType = z.infer<typeof FilterType>;
export type TOpItems = z.infer<typeof OpItems>;
export type TFilterAssociation = z.infer<typeof FilterAssociation>;
