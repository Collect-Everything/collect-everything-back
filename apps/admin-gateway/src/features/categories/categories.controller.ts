import { GatewayController, ctrlWrapper, errorBuilder } from "@ce/server-core";
import { RequestHandler } from "express";

class CategoriesCtrl extends GatewayController {
  constructor() {
    super("categories", {
      service: "PRODUCTS",
    });
  }

  /**
   * @swagger
   * /categories:
   *   get:
   *     summary: Retrieve a list of Categories
   *     tags: 
   *       - Category
   */
  getListCategories: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier("getListCategories"), res, async () => {
      const { data } = await this.fetcher.get("/categories");
      return data;
    });

  /**
   * @swagger
   * /categories/{id}:
   *   get:
   *     summary: Retrieve Category from given ID
   *     tags: 
   *       - Category
   */
  getOneCategory: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier("getOneCategory"), res, async () => {
      const { id } = req.params;
      if (!id) {
        throw errorBuilder.badRequest();
      }
      const { data } = await this.fetcher.get(`/categories/${id}`);
      return data;
    });

  /**
   * @swagger
   * /categories:
   *   post:
   *     summary: Create Category
   *     tags: 
   *       - Category
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               company_id:
   *                 type: integer
   */
  createCategory: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier("createCategory"), res, async () => {
      const { data } = await this.fetcher.post("/categories", req.body);
      return data;
    });

  /**
   * @swagger
   * /categories/{id}:
   *   patch:
   *     summary: Update Category from given ID with body
   *     description: send JSON with only fields to edit
   *     tags: 
   *       - Category
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               company_id:
   *                 type: integer
   */
  updateCategory: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier("updateCategory"), res, async () => {
      const { id } = req.params;
      if (!id) {
        throw errorBuilder.badRequest();
      }
      const { data } = await this.fetcher.patch(`/categories/${id}`, req.body);
      return data;
    });

  /**
   * @swagger
   * /categories/{id}:
   *   delete:
   *     summary: Delete Category from given ID
   *     tags: 
   *       - Category
   */
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
