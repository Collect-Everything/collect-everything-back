import { categoriesCtrl } from "./categories.controller";
import express from "express";
import { isLogged } from "@ce/server-core";

const categoriesRouter = express.Router();

categoriesRouter.get("/", [], categoriesCtrl.getListCategories);
categoriesRouter.get("/:id", [], categoriesCtrl.getOneCategory);
categoriesRouter.post("/", [isLogged], categoriesCtrl.createCategory);
categoriesRouter.patch("/:id", [isLogged], categoriesCtrl.updateCategory);
categoriesRouter.delete("/:id", [isLogged], categoriesCtrl.deleteCategory);

export { categoriesRouter };
