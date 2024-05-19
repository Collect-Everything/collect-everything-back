import { eventsService } from "./events";
import { CompaniesController } from "./features/companies/companies.controller";
import { CompaniesRouter } from "./features/companies/companies.router";
import { CompaniesService } from "./features/companies/companies.service";
import { CompanyUsersController } from "./features/company-users/company-users.controller";
import { CompanyUsersRouter } from "./features/company-users/company-users.router";
import { CompanyUsersService } from "./features/company-users/company-users.service";
import { EmailValidationService } from "./features/email-validation/email-validation.service";

const companiesService = new CompaniesService(eventsService);
const companyUsersService = new CompanyUsersService(eventsService);
const emailValidationService = new EmailValidationService();

const companiesCtrl = new CompaniesController(
  companiesService,
  companyUsersService,
);
const companyUsersCtrl = new CompanyUsersController(companyUsersService);

const companiesRouter = new CompaniesRouter(companiesCtrl).router;
const companyUsersRouter = new CompanyUsersRouter(companyUsersCtrl).router;

export {
  companiesService,
  companyUsersService,
  emailValidationService,
  companyUsersRouter,
  companiesRouter,
};
