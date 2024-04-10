import { CrudRouter } from "@ce/server-core";
import { companyCrudCtrl } from "./company.crud.controller";
import { CompanyService } from "./application/company.service";
import { CompanySequelizeRepository } from "./infra/company.sequelize.repository";
import { CompanyCtrl } from "./company.controller";

const companyRepository = new CompanySequelizeRepository();

const companyService = new CompanyService(companyRepository);

const companyController = new CompanyCtrl(companyService);

class CompanyRouter extends CrudRouter {
  constructor() {
    super({
      ctrl: companyCrudCtrl,
      middlewares: {
        list: [],
      },
    });
  }

  protected addRoutesBeforeCrud() {
    this.router.post("/create", [], companyController.createCompany);
  }
}

export const companyRouter = new CompanyRouter().router;
