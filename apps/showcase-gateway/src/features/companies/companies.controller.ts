import { GatewayController, ctrlWrapper, errorBuilder } from "@ce/server-core";
import { RequestHandler } from "express";

class CompaniesCtrl extends GatewayController {
  constructor() {
    super("companies", {
      service: "COMPANIES",
    });
  }

  getCompany: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier("getCompany"), res, async () => {
      const { id } = req.params;

      if (!id) {
        throw errorBuilder.badRequest();
      }

      const { data } = await this.fetcher.get(`/companies/${id}`, req.body);
      return data;
    });
}

export const companiesCtrl = new CompaniesCtrl();
