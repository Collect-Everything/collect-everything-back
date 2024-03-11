import { GatewayCrudController, ctrlWrapper } from "@ce/server-core";
import { RequestHandler } from "express";

class CompanyUsersCtrl extends GatewayCrudController {
  constructor() {
    super(
      {
        service: "COMPANY_USERS",
      },
      "company_users",
    );
  }

  login: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier("login"), res, async () => {
      const { data } = await this.fetcher.post("/auth/login", req.body);
      return data;
    });

  register: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier("register"), res, async () => {
      const { data } = await this.fetcher.post("/auth/register", req.body);
      return data;
    });

  refreshToken: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier("refreshToken"), res, async () => {
      const { data } = await this.fetcher.post("/auth/refresh", req.body);
      return data;
    });
}

export const companyUsersCtrl = new CompanyUsersCtrl();