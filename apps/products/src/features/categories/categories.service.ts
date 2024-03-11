import { TCategory, TCategoryBase } from "@ce/shared-core";
import { apiConfig } from "../../config/api.config";
import { SequelizeService } from "@ce/sequelize";
import { CategoryModel } from "./categories.model";

class CategoriesService extends SequelizeService<
  TCategoryBase,
  TCategory,
  CategoryModel
> {
  constructor() {
    super(CategoryModel, apiConfig);
  }
}

export const categoriesService = new CategoriesService();
