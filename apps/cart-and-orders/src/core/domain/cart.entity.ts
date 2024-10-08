import { Entity, EntityValidationError } from '@ce/shared-core';
import { z } from 'zod';
import { Product, ProductData } from './product.entity';

export const CartPropsSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  products: z.array(z.instanceof(Product))
});

export type CartProps = z.infer<typeof CartPropsSchema>;

export interface CartData {
  id: string;
  customerId: string;
  products: ProductData[];
}

export class Cart extends Entity<CartProps, string> {
  constructor(props: CartProps) {
    super(props);

    this.validate(props);
  }

  get customerId() {
    return this._props.customerId;
  }

  get products() {
    return this._props.products;
  }

  static fromData(data: CartData) {
    const products = data.products.map((product) => new Product(product));
    return new Cart({ id: data.id, customerId: data.customerId, products });
  }

  hasProduct(productId: string) {
    return this._props.products.some((product) => product.id === productId);
  }

  addProduct(product: Product) {
    this._props.products.push(product);
  }

  removeProduct(productId: string) {
    this._props.products = this._props.products.filter(
      (product) => product.id !== productId
    );
  }

  quantityOf(productId: string) {
    return this._props.products.filter((product) => product.id === productId)
      .length;
  }

  private validate(props: CartProps) {
    const result = CartPropsSchema.safeParse(props);

    if (!result.success) {
      throw new EntityValidationError(result.error.errors);
    }
  }
}
