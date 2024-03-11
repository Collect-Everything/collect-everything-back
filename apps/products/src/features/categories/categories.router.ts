import { CrudRouter } from "@ce/server-core";
import { categoriesCtrl } from "./categories.controller";
import { TCategory } from "@ce/shared-core";

class CategoriesRouter extends CrudRouter<TCategory> {
  constructor() {
    super({
      ctrl: categoriesCtrl,
    });
  }
}

export const categoriesRouter = new CategoriesRouter().router;
