import { Entity, EntityValidationError } from "@ce/shared-core";
import { z } from "zod";

export const CategoryPropsSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type CategoryProps = z.infer<typeof CategoryPropsSchema>;

export class Category extends Entity<CategoryProps, string> {
  constructor(props: CategoryProps) {
    super(props);

    this.validate();
  }

  get name() {
    return this._props.name;
  }

  get data() {
    return {
      id: this.id,
      name: this.name,
    };
  }

  static fromData(data: CategoryProps) {
    return new Category(data);
  }

  validate() {
    const result = CategoryPropsSchema.safeParse(this._props);

    if (!result.success) {
      throw new EntityValidationError(result.error.errors);
    }
  }
}
