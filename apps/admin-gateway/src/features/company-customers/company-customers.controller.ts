import { GatewayController, ctrlWrapper, errorBuilder } from "@ce/server-core";
import { RequestHandler } from "express";

class CompanyCustomersCtrl extends GatewayController {
  constructor() {
    super("company_customers", {
      service: "COMPANY_CUSTOMERS",
    });
  }

  /**
   * @swagger
   * /company-customers:
   *   get:
   *     summary: Retrieve a list of Company-Customers
   *     tags:
   *       - Company-Customer
   */
  getlistCompanyCustomers: RequestHandler = (req, res) =>
    ctrlWrapper(
      this.getIdentifier("getlistCompanyCustomers"),
      res,
      async () => {
        const { data } = await this.fetcher.get("/company-customers");
        return data;
      }
    );

  /**
   * @swagger
   * /company-customers/{id}:
   *   get:
   *     summary: Retrieve Company-Customer from given ID
   *     tags:
   *       - Company-Customer
   */
  getOneCompanyCustomer: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier("getOneCompanyCustomer"), res, async () => {
      const { id } = req.params;
      if (!id) {
        throw errorBuilder.badRequest();
      }
      const { data } = await this.fetcher.get(`/company-customers/${id}`);
      return data;
    });

  /**
   * @swagger
   * /company-customers:
   *   post:
   *     summary: Create Company-Customer
   *     tags:
   *       - Company-Customer
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
  createCompanyCustomer: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier("createCompanyCustomer"), res, async () => {
      const { data } = await this.fetcher.post("/company-customers", req.body);
      return data;
    });

  /**
   * @swagger
   * /company-customers:
   *   patch:
   *     summary: Update Company-Customer from given ID with body
   *     description: send JSON with only fields to edit
   *     tags:
   *       - Company-Customer
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
  updateCompanyCustomer: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier("updateCompanyCustomer"), res, async () => {
      const { id } = req.params;
      if (!id) {
        throw errorBuilder.badRequest();
      }
      const { data } = await this.fetcher.patch(
        `/company-customers/${id}`,
        req.body
      );
      return data;
    });

  /**
   * @swagger
   * /company-customers/{id}:
   *   delete:
   *     summary: Delete Company-Customer from given ID
   *     tags:
   *       - Company-Customer
   */
  deleteCompanyCustomer: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier("deleteCompanyCustomer"), res, async () => {
      const { id } = req.params;
      if (!id) {
        throw errorBuilder.badRequest();
      }
      const { data } = await this.fetcher.delete(`/company-customers/${id}`);
      return data;
    });
}

export const companyCustomersCtrl = new CompanyCustomersCtrl();
