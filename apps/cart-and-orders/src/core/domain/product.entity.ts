import { Entity, EntityValidationError } from '@ce/shared-core';
import { z } from 'zod';

const ProductPropsSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number()
});

type ProductProps = z.infer<typeof ProductPropsSchema>;

export interface ProductData {
  id: string;
  name: string;
  price: number;
}

export class Product extends Entity<ProductProps, string> {
  constructor(props: ProductProps) {
    super(props);

    this.validate(props);
  }

  get name() {
    return this._props.name;
  }

  get price() {
    return this._props.price;
  }

  get data() {
    return {
      id: this.id,
      name: this.name,
      price: this.price
    };
  }

  static fromData(data: ProductData) {
    return new Product(data);
  }

  private validate(props: ProductProps) {
    const result = ProductPropsSchema.safeParse(props);
    if (!result.success) {
      throw new EntityValidationError(result.error.errors);
    }
  }
}
