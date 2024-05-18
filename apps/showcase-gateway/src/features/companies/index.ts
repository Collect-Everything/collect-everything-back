import { CompaniesController } from "./companies.controller";
import { CompaniesRouter } from "./companies.router";
import { CompaniesService } from "./companies.service";

const companiesService = new CompaniesService();

const companiesCtrl = new CompaniesController(companiesService);

const companiesRouter = new CompaniesRouter(companiesCtrl).router;

export { companiesRouter };
