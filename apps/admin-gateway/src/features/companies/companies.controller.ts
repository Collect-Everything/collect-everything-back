import { GatewayController, ctrlWrapper, errorBuilder } from "@ce/server-core";
import { RequestHandler } from "express";

class CompaniesCtrl extends GatewayController {
  constructor() {
    super("companies", {
      service: "COMPANIES",
    });
  }

  getlistCompanies: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier("getlistCompanies"), res, async () => {
      const { data } = await this.fetcher.get("/companies");
      return data;
    });

  getOneCompany: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier("getOneCompany"), res, async () => {
      const { id } = req.params;
      if (!id) {
        throw errorBuilder.badRequest();
      }
      const { data } = await this.fetcher.get(`/companies/${id}`);
      return data;
    });

  createCompany: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier("createCompany"), res, async () => {
      const { data } = await this.fetcher.post("/companies", req.body);
      return data;
    });

  updateCompany: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier("updateCompany"), res, async () => {
      const { id } = req.params;
      if (!id) {
        throw errorBuilder.badRequest();
      }
      const { data } = await this.fetcher.patch(`/companies/${id}`, req.body);
      return data;
    });
}

export const companiesCtrl = new CompaniesCtrl();
