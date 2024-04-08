import { CrudRouter } from "@ce/server-core";
import { companyCrudCtrl } from "./crud/company.crud.controller";
import { Company } from "./company.model";
import { CompanyService } from "./application/company.service";
import { CompanySequelizeRepository } from "./infra/company.sequelize.repository";
import { CompanyCtrl } from "./company.controller";

const companyRepository = new CompanySequelizeRepository();

const companyService = new CompanyService(companyRepository);

const companyController = new CompanyCtrl(companyService);

class CompanyRouter extends CrudRouter<Company> {
  constructor() {
    super({
      ctrl: companyCrudCtrl,
      middlewares: {
        list: [],
      },
    });
  }

  protected addRoutesBeforeCrud() {
    this.router.post("/create", [], companyController.create);
  }
}

export const companyRouter = new CompanyRouter().router;
