import { GatewayController, ctrlWrapper, errorBuilder } from "@ce/server-core";
import { RequestHandler } from "express";

class CompanyUsersCtrl extends GatewayController {
  constructor() {
    super("company_users", {
      service: "COMPANY_USERS",
    });
  }

  /**
   * @swagger
   * /company-users:
   *   get:
   *     summary: Retrieve a list of Company-Users
   *     tags:
   *       - Company-User
   */
  getlistCompanyUsers: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier("getlistCompanyUsers"), res, async () => {
      const { data } = await this.fetcher.get("/company-users");
      return data;
    });

  /**
   * @swagger
   * /company-users/{id}:
   *   get:
   *     summary: Retrieve Company-User from given ID
   *     tags:
   *       - Company-User
   */
  getOneCompanyUser: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier("getOneCompanyUser"), res, async () => {
      const { id } = req.params;
      if (!id) {
        throw errorBuilder.badRequest();
      }
      const { data } = await this.fetcher.get(`/company-users/${id}`);
      return data;
    });

  /**
   * @swagger
   * /company-users:
   *   post:
   *     summary: Create Company-User
   *     tags:
   *       - Company-User
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               firstname:
   *                 type: string
   *               lastname:
   *                 type: string
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *               company_id:
   *                 type: integer
   */
  createCompanyUser: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier("createCompanyUser"), res, async () => {
      const { data } = await this.fetcher.post("/company-users", req.body);
      return data;
    });

  /**
   * @swagger
   * /company-users:
   *   patch:
   *     summary: Update Company-User from given ID with body
   *     description: send JSON with only fields to edit
   *     tags:
   *       - Company-User
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               firstname:
   *                 type: string
   *               lastname:
   *                 type: string
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *               company_id:
   *                 type: integer
   */
  updateCompanyUser: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier("updateCompanyUser"), res, async () => {
      const { id } = req.params;
      if (!id) {
        throw errorBuilder.badRequest();
      }
      const { data } = await this.fetcher.patch(
        `/company-users/${id}`,
        req.body
      );
      return data;
    });

  /**
   * @swagger
   * /company-users/{id}:
   *   delete:
   *     summary: Delete Company-User from given ID
   *     tags:
   *       - Company-User
   */
  deleteCompanyUser: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier("deleteCompanyUser"), res, async () => {
      const { id } = req.params;
      if (!id) {
        throw errorBuilder.badRequest();
      }
      const { data } = await this.fetcher.delete(`/company-users/${id}`);
      return data;
    });
}

export const companyUsersCtrl = new CompanyUsersCtrl();
