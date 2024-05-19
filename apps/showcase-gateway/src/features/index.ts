import { eventsService } from "../lib/events";
import { CompaniesController } from "./companies/companies.controller";
import { CompaniesRouter } from "./companies/companies.router";
import { CompaniesService } from "./companies/companies.service";
import { CompanyUsersController } from "./company-users/company-users.controller";
import { CompanyUsersRouter } from "./company-users/company-users.router";
import { CompanyUsersService } from "./company-users/company-users.service";

const companiesService = new CompaniesService(eventsService);
const companyUsersService = new CompanyUsersService(eventsService);

const companiesCtrl = new CompaniesController(
  companiesService,
  companyUsersService,
);
const companyUsersCtrl = new CompanyUsersController(companyUsersService);

const companiesRouter = new CompaniesRouter(companiesCtrl).router;
const companyUsersRouter = new CompanyUsersRouter(companyUsersCtrl).router;

export { companyUsersRouter, companiesRouter };
