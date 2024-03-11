import { GatewayController, ctrlWrapper, errorBuilder } from "@ce/server-core";
import { RequestHandler } from "express";

class CategoriesCtrl extends GatewayController {
  constructor() {
    super("categories", {
      service: "PRODUCTS",
    });
  }

  getListCategories: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier("getListCategories"), res, async () => {
      const { data } = await this.fetcher.get("/categories");
      return data;
    });

  getOneCategory: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier("getOneCategory"), res, async () => {
      const { id } = req.params;
      if (!id) {
        throw errorBuilder.badRequest();
      }
      const { data } = await this.fetcher.get(`/categories/${id}`);
      return data;
    });

  createCategory: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier("createCategory"), res, async () => {
      const { data } = await this.fetcher.post("/categories", req.body);
      return data;
    });

  updateCategory: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier("updateCategory"), res, async () => {
      const { id } = req.params;
      if (!id) {
        throw errorBuilder.badRequest();
      }
      const { data } = await this.fetcher.patch(`/categories/${id}`, req.body);
      return data;
    });

  deleteCategory: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier("deleteCategory"), res, async () => {
      const { id } = req.params;
      if (!id) {
        throw errorBuilder.badRequest();
      }
      const { data } = await this.fetcher.delete(`/categories/${id}`);
      return data;
    });
}

export const categoriesCtrl = new CategoriesCtrl();
