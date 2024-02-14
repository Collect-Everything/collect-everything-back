import {
  ZodArray,
  ZodBoolean,
  ZodEffects,
  ZodEnum,
  ZodNumber,
  ZodObject,
  ZodOptional,
  ZodRecord,
  ZodString,
  ZodTypeAny,
} from "zod";

/**
 * Simple example mapping to string version of each type, would need to be completed with all types
 */
export type GetRequiredType<T> = T extends Array<any>
  ? "array"
  : T extends string
    ? "string"
    : T extends number
      ? "number"
      : T extends boolean
        ? "boolean"
        : T extends object
          ? "object"
          : T extends ZodEnum<any>
            ? "enum"
            : any;

/**
 * Append `Optional` to the key name for optional properties.
 */
export type GetType<T> = undefined extends T
  ? `${GetRequiredType<T>}Optional`
  : GetRequiredType<T>;

/**
 * Simple example mapping / lookup of "rough" Zod types for each concrete type.
 */
export interface ZodTypes {
  string: ZodString | ZodEffects<ZodString, string, any> | ZodEnum<any>;
  stringOptional:
    | ZodOptional<ZodString | ZodEffects<ZodString, string, any>>
    | ZodOptional<ZodEnum<any>>;
  number: ZodNumber | ZodEffects<ZodNumber, number, any>;
  numberOptional: ZodOptional<ZodNumber | ZodEffects<ZodNumber, number, any>>;
  boolean: ZodBoolean | ZodEffects<ZodBoolean, boolean, any>;
  booleanOptional: ZodOptional<
    ZodBoolean | ZodEffects<ZodBoolean, boolean, any>
  >;
  object: ZodObject<any, any, any, any> | ZodRecord<any, any>;
  objectOptional: ZodOptional<ZodObject<any, any, any, any>>;
  array: ZodArray<any>;
  arrayOptional: ZodOptional<ZodArray<any>>;
  enum: ZodEnum<any>;
  enumOptional: ZodOptional<ZodEnum<any>>;
}

/**
 * Cast the existing output interface as a ZodRawShape using the lookups defined above.
 */
export type ToZodRawObject<Output extends object> = {
  [Key in keyof Output]: ZodTypes[GetType<Output[Key]>];
};

/**
 * Case the existing output interface as a valid ZodObject.
 */
export type ToZodObject<Output extends object> = ZodObject<
  ToZodRawObject<Output>,
  "strip",
  ZodTypeAny,
  Output
>;
