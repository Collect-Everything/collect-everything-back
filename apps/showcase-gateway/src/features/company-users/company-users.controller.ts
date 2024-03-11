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
   *     tags: [CompanyUsers]
   *     summary: Login for company-customers
   *     requestBody:
   *      required: true
   *      content:
   *       application/json:
   *        schema:
   *          type: object
   *          properties:
   *            email:
   *              type: string
   *            password:
   *              type: string
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
   *     tags: [CompanyUsers]
   *     summary: Register for company-customers
   *     requestBody:
   *      required: true
   *      content:
   *       application/json:
   *        schema:
   *          type: object
   *          properties:
   *            email:
   *              type: string
   *            password:
   *              type: string
   *              minLength: 8
   *              maxLength: 100
   *            firstname:
   *              type: string
   *            lastname:
   *              type: string
   *            role:
   *              type: string
   *              enum: [ADMIN,STOCK_MANAGER,ORDER_MANAGER]
   *            company_id:
   *              type: string
   *
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
   *     tags: [CompanyUsers]
   *     summary: Refresh token for company-customers
   *     requestBody:
   *       required: true
   *       content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              refreshToken:
   *                type: string
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
