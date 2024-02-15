import { GatewayCrudController, ctrlWrapper } from "@ce/server-core";
import { RequestHandler } from "express";

class AdminsCtrl extends GatewayCrudController {
  constructor() {
    super(
      {
        service: "ADMINS",
      },
      "admins",
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

export const adminsCtrl = new AdminsCtrl();
