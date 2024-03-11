import { productsCtrl } from "./products.controller";
import express from "express";

const productsRouter = express.Router();

productsRouter.get("/", [], productsCtrl.getlistProducts);
productsRouter.get("/:id", [], productsCtrl.getOneProduct);

export { productsRouter };
