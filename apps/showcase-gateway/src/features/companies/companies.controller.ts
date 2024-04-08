import { GatewayController, ctrlWrapper, errorBuilder } from "@ce/server-core";
import { RequestHandler } from "express";

class CompaniesCtrl extends GatewayController {
  constructor() {
    super("companies", {
      service: "COMPANIES",
    });
  }

  /**
   * @openapi
   * /companies/{id}:
   *   get:
   *     tags: [Companies]
   *     summary: Get a company by id
   *     parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: string
   *        required: true
   *        description: The id of the company
   *
   *     responses:
   *       200:
   *         description: Returns a company
   */
  getCompany: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier("getCompany"), res, async () => {
      const { id } = req.params;

      if (!id) {
        throw errorBuilder.badRequest();
      }

      const { data } = await this.fetcher.get(`/companies/${id}`);
      return data;
    });

  createCompany: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier("createCompany"), res, async () => {
      await this.fetcher.post("/companies/create", req.body);
    });
}

export const companiesCtrl = new CompaniesCtrl();
