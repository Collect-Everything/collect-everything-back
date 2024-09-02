import { ProductUnity, ProductSize } from "@ce/shared-core";

export interface CreateProductCommand {
  categoryId: string;

  name: string;
  price: number;
  description?: string;
  image?: string;
  stock: number;
  conditioning: number
  unity: ProductUnity;
  size?: ProductSize;
}
