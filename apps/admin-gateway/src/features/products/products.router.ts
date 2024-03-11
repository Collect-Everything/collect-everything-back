import { productsCtrl } from "./products.controller";
import express from "express";
import { isLogged } from "@ce/server-core";

const productsRouter = express.Router();

productsRouter.get("/", [], productsCtrl.getlistProducts);
productsRouter.get("/:id", [], productsCtrl.getOneProduct);
productsRouter.post("/", [isLogged], productsCtrl.createProduct);
productsRouter.patch("/:id", [isLogged], productsCtrl.updateProduct);
productsRouter.delete("/:id", [isLogged], productsCtrl.deleteProduct);

export { productsRouter };
