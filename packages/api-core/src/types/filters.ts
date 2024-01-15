export const FILTER_OP = {
  GT: "$gt",
  GTE: "$gte",
  EQ: "$eq",
  NE: "$ne",
  LT: "$lt",
  LTE: "$lte",
} as const;

export const FILTER_TYPES = {
  STRING: "string",
  DATE: "date",
  BOOLEAN: "boolean",
  NUMBER: "number",
  ENUM: "enum",
  ID: "_id",
  IN: "in",
  DATE_BETWEEN: "dateBetween",
} as const;

export const FILTER_ASSOCIATIONS = {
  AND: "$and",
  OR: "$or",
} as const;

export type TFilterOp = (typeof FILTER_OP)[keyof typeof FILTER_OP];
export type TFilterType = (typeof FILTER_TYPES)[keyof typeof FILTER_TYPES];
export type TFilterAssociation =
  (typeof FILTER_ASSOCIATIONS)[keyof typeof FILTER_ASSOCIATIONS];

export interface IFilter {
  id: string;
  type: TFilterType;
  op?: TFilterOp;
  value?: any;
  association?: TFilterAssociation;
}
