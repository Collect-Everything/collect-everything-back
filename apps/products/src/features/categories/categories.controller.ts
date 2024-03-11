import { CrudController } from "@ce/server-core";
import { categoriesService } from "./categories.service";
import {
  CategoryBaseSchema,
  CategorySchema,
  TCategoryBase,
  TCategory,
} from "@ce/shared-core";
import { CategoryModel } from "./categories.model";

class CategoriesCtrl extends CrudController<
  TCategoryBase,
  TCategory,
  CategoryModel
> {
  constructor() {
    super({
      name: "categories",
      service: categoriesService,
      baseSchema: CategoryBaseSchema,
      schema: CategorySchema,
    });
  }
}

export const categoriesCtrl = new CategoriesCtrl();
