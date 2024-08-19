import { Entity, EntityValidationError, ProductConditioning, ProductConditioningSchema, ProductSize, ProductSizeSchema, ProductUnity, ProductUnitySchema } from "@ce/shared-core";
import { z } from "zod";
import { Category } from "./category.entity";


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

interface ProductData {
  id: string;
  companyId: string;
  category: Category;
  name: string;
  price: number;
  description?: string;
  image?: string;
  stock: number;
  conditioning: string;
  unity: string;
  size?: string;
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

  get data() {
    return {
      id: this.id,
      companyId: this.companyId,
      category: this.category.data,
      name: this.name,
      price: this._props.price,
      description: this._props.description,
      image: this._props.image,
      stock: this._props.stock,
      conditioning: this._props.conditioning,
      unity: this._props.unity,
      size: this._props.size,
    };
  }

  update(props: UpdateProductProps) {
    this._props = {
      ...this._props,
      ...props,
    };
    this.validate();
  }

  static fromData(data: ProductData): Product {
    const conditioningResult = ProductConditioningSchema.parse(
      data.conditioning,
    );
    const unityResult = ProductUnitySchema.parse(data.unity);
    const sizeResult = ProductSizeSchema.optional().parse(data.size);
    return new Product({
      id: data.id,
      companyId: data.companyId,
      category: data.category,
      name: data.name,
      price: data.price,
      description: data.description,
      image: data.image,
      stock: data.stock,
      conditioning: conditioningResult,
      unity: unityResult,
      size: sizeResult,
    });
  }

  validate() {
    const result = ProductPropsSchema.safeParse(this._props);

    if (!result.success) {
      throw new EntityValidationError(result.error.errors);
    }
  }
}
