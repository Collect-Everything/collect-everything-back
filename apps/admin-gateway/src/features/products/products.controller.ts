import { GatewayController, ctrlWrapper, errorBuilder } from "@ce/server-core";
import { RequestHandler } from "express";

class ProductsCtrl extends GatewayController {
  constructor() {
    super("products", {
      service: "PRODUCTS",
    });
  }

  /**
   * @swagger
   * /products:
   *   get:
   *     summary: Retrieve a list of Products
   *     tags:
   *       - Product
   */
  getlistProducts: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier("getlistProducts"), res, async () => {
      const { data } = await this.fetcher.get("/products");
      return data;
    });

  /**
   * @swagger
   * /products/{id}:
   *   get:
   *     summary: Retrieve Product from given ID
   *     tags:
   *       - Product
   */
  getOneProduct: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier("getOneProduct"), res, async () => {
      const { id } = req.params;
      if (!id) {
        throw errorBuilder.badRequest();
      }
      const { data } = await this.fetcher.get(`/products/${id}`);
      return data;
    });

  /**
   * @swagger
   * /products:
   *   post:
   *     summary: Create Product
   *     tags:
   *       - Product
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               price:
   *                 type: integer
   *               description:
   *                 type: string
   *               photo:
   *                 type: string
   *               conditioning:
   *                 type: string
   *               size:
   *                 type: string
   *               stock:
   *                 type: integer
   *               unity:
   *                 type: string
   *               category_id:
   *                 type: integer
   *               parent_id:
   *                 type: integer
   */
  createProduct: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier("createProduct"), res, async () => {
      const { data } = await this.fetcher.post("/products", req.body);
      return data;
    });

  /**
   * @swagger
   * /products/{id}:
   *   patch:
   *     summary: Update Product from given ID with body
   *     description: send JSON with only fields to edit
   *     tags:
   *       - Product
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               price:
   *                 type: integer
   *               description:
   *                 type: string
   *               photo:
   *                 type: string
   *               conditioning:
   *                 type: string
   *               size:
   *                 type: string
   *               stock:
   *                 type: integer
   *               unity:
   *                 type: string
   *               category_id:
   *                 type: integer
   *               parent_id:
   *                 type: integer
   */
  updateProduct: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier("updateProduct"), res, async () => {
      const { id } = req.params;
      if (!id) {
        throw errorBuilder.badRequest();
      }
      const { data } = await this.fetcher.patch(`/products/${id}`, req.body);
      return data;
    });

  /**
   * @swagger
   * /products/{id}:
   *   delete:
   *     summary: Delete Product from given ID
   *     tags:
   *       - Product
   */
  deleteProduct: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier("deleteProduct"), res, async () => {
      const { id } = req.params;
      if (!id) {
        throw errorBuilder.badRequest();
      }
      const { data } = await this.fetcher.delete(`/products/${id}`);
      return data;
    });
}

export const productsCtrl = new ProductsCtrl();
