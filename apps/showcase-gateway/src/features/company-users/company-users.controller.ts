import { GatewayController, ctrlWrapper, parseBody } from "@ce/server-core";
import { RequestHandler } from "express";
import { CompanyUsersService } from "./company-users.service";
import { CreateCompanyUserDTOSchema } from "@ce/shared-core";

export class CompanyUsersController extends GatewayController {
  constructor(private readonly companyUsersService: CompanyUsersService) {
    super("company_users");
  }

  /**
   * @swagger
   * /company-users:
   *   post:
   *     summary: Create Company-User
   *     tags:
   *       - Company-User
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
   *               role:
   *                 type: string
   *                 enum:
   *                   - ADMIN
   *                   - STOCK_MANAGER
   *                   - ORDER_MANAGER
   *               password:
   *                 type: string
   *               company_id:
   *                 type: integer
   */
  createCompanyUser: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier("createCompanyUser"), res, async () => {
      const body = parseBody(req, CreateCompanyUserDTOSchema);
      await this.companyUsersService.create(body);
    });
}
