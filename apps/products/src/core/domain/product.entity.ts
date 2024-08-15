import { Entity, EntityValidationError } from "@ce/shared-core";
import { z } from "zod";
import { Category } from "./category.entity";

const PRODUCT_CONDITIONING = ["unit"] as const;
export type ProductConditioning = (typeof PRODUCT_CONDITIONING)[number];
export const ProductConditioningSchema = z.enum(PRODUCT_CONDITIONING);

const PRODUCT_UNITIES = ["unit", "kg", "g", "L", "ml"] as const;
export type ProductUnity = (typeof PRODUCT_UNITIES)[number];
export const ProductUnitySchema = z.enum(PRODUCT_UNITIES);

const PRODUCT_SIZE = ["small", "medium", "large", "extra-large"] as const;
export type ProductSize = (typeof PRODUCT_SIZE)[number];
export const ProductSizeSchema = z.enum(PRODUCT_SIZE);

const ProductPropsSchema = z.object({
  id: z.string(),
  companyId: z.string(),
  category: z.instanceof(Category),
  name: z.string(),
  price: z.number().min(0),
  description: z.string().optional(),
  image: z.string().optional(),
  stock: z.number().min(0),
  conditioning: ProductConditioningSchema,
  unity: ProductUnitySchema,
  size: ProductSizeSchema.optional(),
});

interface UpdateProductProps {
  name?: string;
  price?: number;
  description?: string;
  image?: string;
  stock?: number;
  conditioning?: ProductConditioning;
  unity?: ProductUnity;
  size?: ProductSize;
}

export type ProductProps = z.infer<typeof ProductPropsSchema>;

export class Product extends Entity<ProductProps, string> {
  constructor(props: ProductProps) {
    super(props);

    this.validate();
  }

  get companyId() {
    return this._props.companyId;
  }

  get category() {
    return this._props.category;
  }

  get name() {
    return this._props.name;
  }

  update(props: UpdateProductProps) {
    this._props = {
      ...this._props,
      ...props,
    };
    this.validate();
  }

  static fromData(data: ProductProps): Product {
    return new Product(data);
  }

  validate() {
    const result = ProductPropsSchema.safeParse(this._props);

    if (!result.success) {
      throw new EntityValidationError(result.error.errors);
    }
  }
}
