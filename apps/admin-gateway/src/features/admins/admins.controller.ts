import { GatewayController, ctrlWrapper } from "@ce/server-core";
import { RequestHandler } from "express";

class AdminsCtrl extends GatewayController {
  constructor() {
    super("admins", {
      service: "ADMINS",
    });
  }

  /**
   * @swagger
   * /admins:
   *   get:
   *     summary: Retrieve a list of Admin Users
   *     tags:
   *       - Admins
   */
  listAdmins: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier("listAdmins"), res, async () => {
      const { data } = await this.fetcher.get("/admins");
      return data;
    });

  /**
   * @swagger
   * /auth/login:
   *   get:
   *     summary: Login as Administrator
   *     tags:
   *       - Admins
   */
  login: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier("login"), res, async () => {
      const { data } = await this.fetcher.post("/auth/login", req.body);
      return data;
    });

  /**
   * @swagger
   * /auth/refresh:
   *   get:
   *     summary: Refresh token for currently logged User
   *     tags:
   *       - Admins
   */
  refreshToken: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier("refreshToken"), res, async () => {
      const { data } = await this.fetcher.post("/auth/refresh", req.body);
      return data;
    });
}

export const adminsCtrl = new AdminsCtrl();
