import { Entity, EntityValidationError, OrderStatus } from '@ce/shared-core';
import { z } from 'zod';
import { Product, ProductData } from './product.entity';

export const OrderPropsSchema = z.object({
  id: z.string(),
  status: OrderStatus,
  customerId: z.string(),
  products: z.array(z.instanceof(Product))
});

export type OrderProps = z.infer<typeof OrderPropsSchema>;

export interface OrderData {
  id: string;
  status: OrderStatus;
  customerId: string;
  products: ProductData[];
}

export interface ProductWithQuantity extends ProductData {
  quantity: number;
}

export interface OrderSummary {
  id: string;
  status: OrderStatus;
  customerId: string;
  products: ProductWithQuantity[];
  totalPrice: number;
}

export class Order extends Entity<OrderProps, string> {
  constructor(props: OrderProps) {
    super(props);

    this.validate(props);
  }

  get customerId() {
    return this._props.customerId;
  }

  get products() {
    return this._props.products;
  }

  get productsWithQuantity(): ProductWithQuantity[] {
    const uniqueProducts = Array.from(new Set(this.products));

    return uniqueProducts.map((product) => ({
      ...product.data,
      quantity: this.quantityOf(product.id)
    }));
  }

  get summary(): OrderSummary {
    return {
      id: this.id,
      status: this.status,
      customerId: this.customerId,
      products: this.productsWithQuantity,
      totalPrice: this.totalPrice
    };
  }

  get status() {
    return this._props.status;
  }

  get totalPrice() {
    return this._props.products.reduce(
      (total, product) => total + product.price,
      0
    );
  }

  static fromData(data: OrderData) {
    const products = data.products.map((product) => new Product(product));
    return new Order({
      id: data.id,
      status: data.status,
      customerId: data.customerId,
      products
    });
  }

  updateStatus(status: OrderStatus) {
    this._props.status = status;
  }

  hasProduct(productId: string) {
    return this._props.products.some((product) => product.id === productId);
  }

  quantityOf(productId: string) {
    return this._props.products.filter((product) => product.id === productId)
      .length;
  }

  private validate(props: OrderProps) {
    const result = OrderPropsSchema.safeParse(props);

    if (!result.success) {
      throw new EntityValidationError(result.error.errors);
    }
  }
}
