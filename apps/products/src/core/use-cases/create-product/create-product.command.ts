import {
  ProductConditioning,
  ProductSize,
  ProductUnity,
} from "../../domain/product.entity";

export interface CreateProductCommand {
  categoryId: string;
  companyId: string;

  name: string;
  price: number;
  description?: string;
  image?: string;
  stock: number;
  conditioning: ProductConditioning;
  unity: ProductUnity;
  size?: ProductSize;
}
