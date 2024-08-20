import { ProductConditioning, ProductSize, ProductUnity } from "@ce/shared-core";

export interface UpdateProductCommand {
  productId: string;

  name?: string;
  price?: number;
  description?: string;
  image?: string;
  conditioning?: ProductConditioning;
  size?: ProductSize;
  stock?: number;
  unity?: ProductUnity;
}
