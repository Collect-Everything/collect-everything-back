import { Entity, EntityValidationError } from "@ce/shared-core";
import { z } from "zod";

const ProductPropsSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number().min(0),
});

export type ProductProps = z.infer<typeof ProductPropsSchema>;

export class Product extends Entity<ProductProps, string> {
  constructor(props: ProductProps) {
    super(props);

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
