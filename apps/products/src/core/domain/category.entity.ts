import { Entity, EntityValidationError } from "@ce/shared-core";
import { z } from "zod";

export const CategoryPropsSchema = z.object({
  id: z.string(),
  name: z.string(),
  companyId: z.string(),
});

export interface CategoryData {
  id: string;
  name: string;
}

interface UpdateCategoryProps {
  name?: string;
}

export type CategoryProps = z.infer<typeof CategoryPropsSchema>;

export class Category extends Entity<CategoryProps, string> {
  constructor(props: CategoryProps) {
    super(props);

    this.validate();
  }

  get companyId() {
    return this._props.companyId;
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

  update(props: UpdateCategoryProps) {
    this._props = {
      ...this._props,
      ...props,
    };
    this.validate();
  }
}
