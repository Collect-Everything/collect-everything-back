import { productsCtrl } from "./products.controller";
import express from "express";
import { isLogged } from "@ce/server-core";

const productsRouter = express.Router();

productsRouter.get("/", [], productsCtrl.getlistProducts);
productsRouter.get("/:id", [], productsCtrl.getOneProduct);
productsRouter.get("/", [isLogged], productsCtrl.createProduct);
productsRouter.get("/", [isLogged], productsCtrl.updateProduct);
productsRouter.get("/:id", [isLogged], productsCtrl.deleteProduct);

export { productsRouter };
