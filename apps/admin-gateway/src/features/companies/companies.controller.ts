import { GatewayController, ctrlWrapper, errorBuilder } from "@ce/server-core";
import { RequestHandler } from "express";

class CompaniesCtrl extends GatewayController {
  constructor() {
    super("companies", {
      service: "COMPANIES",
    });
  }

  /**
   * @swagger
   * /companies:
   *   get:
   *     summary: Retrieve a list of Companies
   *     tags:
   *       - Company
   */
  getlistCompanies: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier("getlistCompanies"), res, async () => {
      const query = req.originalUrl;
      console.log(query);
      let querys = query.split("?");
      let queryString = "?" + querys[1];
      const { data } = await this.fetcher.get("/companies" + queryString);
      return data;
    });

  /**
   * @swagger
   * /companies/{id}:
   *   get:
   *     summary: Retrieve Company from given ID
   *     tags:
   *       - Company
   */
  getOneCompany: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier("getOneCompany"), res, async () => {
      const { id } = req.params;
      if (!id) {
        throw errorBuilder.badRequest();
      }
      const { data } = await this.fetcher.get(`/companies/${id}`);
      return data;
    });

  /**
   * @swagger
   * /companies:
   *   post:
   *     summary: Create Company
   *     tags:
   *       - Company
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               phone:
   *                 type: string
   *               email:
   *                 type: string
   *               address_label:
   *                 type: string
   *               street:
   *                 type: string
   *               street_number:
   *                 type: string
   *               postal_code:
   *                 type: string
   *               city:
   *                 type: string
   *               country:
   *                 type: string
   *               color:
   *                 type: string
   *               logo:
   *                 type: string
   *               key_phrases:
   *                 type: json
   *               products_type:
   *                 type: string
   *               siret:
   *                 type: string
   *               phone_contact:
   *                 type: string
   *               email_contact:
   *                 type: string
   */
  createCompany: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier("createCompany"), res, async () => {
      const { data } = await this.fetcher.post("/companies", req.body);
      return data;
    });

  /**
   * @swagger
   * /companies:
   *   patch:
   *     summary: Update Company from given ID with body
   *     description: send JSON with only fields to edit
   *     tags:
   *       - Company
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               phone:
   *                 type: string
   *               email:
   *                 type: string
   *               address_label:
   *                 type: string
   *               street:
   *                 type: string
   *               street_number:
   *                 type: string
   *               postal_code:
   *                 type: string
   *               city:
   *                 type: string
   *               country:
   *                 type: string
   *               color:
   *                 type: string
   *               logo:
   *                 type: string
   *               key_phrases:
   *                 type: json
   *               products_type:
   *                 type: string
   *               siret:
   *                 type: string
   *               phone_contact:
   *                 type: string
   *               email_contact:
   *                 type: string
   */
  updateCompany: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier("updateCompany"), res, async () => {
      const { id } = req.params;
      if (!id) {
        throw errorBuilder.badRequest();
      }
      const { data } = await this.fetcher.patch(`/companies/${id}`, req.body);
      return data;
    });

  /**
   * @swagger
   * /companies/{id}:
   *   delete:
   *     summary: Delete Company from given ID
   *     tags:
   *       - Company
   */
  deleteCompany: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier("deleteCompany"), res, async () => {
      const { id } = req.params;
      if (!id) {
        throw errorBuilder.badRequest();
      }
      const { data } = await this.fetcher.delete(`/companies/${id}`);
      return data;
    });
}

export const companiesCtrl = new CompaniesCtrl();
