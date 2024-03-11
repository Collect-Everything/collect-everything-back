import { GatewayController, ctrlWrapper } from "@ce/server-core";
import { RequestHandler } from "express";

class CompanyUsersCtrl extends GatewayController {
  constructor() {
    super("company_users", {
      service: "COMPANY_USERS",
    });
  }

  /**
   * @openapi
   * /company-users/login:
   *   post:
   *     description: Login for company-customers
   *     responses:
   *       200:
   *         description: Returns a token
   */
  login: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier("login"), res, async () => {
      const { data } = await this.fetcher.post("/auth/login", req.body);
      return data;
    });

  /**
   * @openapi
   * /company-users/register:
   *   post:
   *     description: Register for company-customers
   *     responses:
   *       200:
   *         description: Returns the created customer
   */
  register: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier("register"), res, async () => {
      const { data } = await this.fetcher.post("/auth/register", req.body);
      return data;
    });

  /**
   * @openapi
   * /company-customers/refresh:
   *   post:
   *     description: Refresh token for company-customers
   *     responses:
   *       200:
   *         description: Returns a new token
   */
  refreshToken: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier("refreshToken"), res, async () => {
      const { data } = await this.fetcher.post("/auth/refresh", req.body);
      return data;
    });
}

export const companyUsersCtrl = new CompanyUsersCtrl();
