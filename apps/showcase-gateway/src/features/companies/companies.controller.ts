import { GatewayController, ctrlWrapper, errorBuilder } from "@ce/server-core";
import { RequestHandler } from "express";

class CompaniesCtrl extends GatewayController {
  constructor() {
    super("companies");
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
      const companyDataCreation = {
        name: req.body.name,
        password: req.body.password,
        phone: req.body.phone,
        email: req.body.email,
        address_label: req.body.address_label,
        street: req.body.street,
        street_number: req.body.street_number,
        postal_code: req.body.postal_code,
        city: req.body.city,
        country: req.body.country,
      };

      console.log("companyDataCreation", companyDataCreation);

      const companyData = await this.fetcher.post(
        "/companies/create",
        companyDataCreation,
      );
      const company = companyData.data;
      console.log("data_company", company);

      const companyAdminData = {
        email: req.body.email,
        password: req.body.password,
        firstname: req.body.user_firstname,
        lastname: req.body.user_lastname,
        role: "ADMIN",
        company_id: company.data.id,
      };

      console.log("companyAdminData", companyAdminData);

      const adminCompanyData = await this.fetcher.post(
        "/company_users/createCompanyUser",
        companyAdminData,
      );

      const adminCompany = adminCompanyData.data;

      return adminCompany;
    });
}

export const companiesCtrl = new CompaniesCtrl();
