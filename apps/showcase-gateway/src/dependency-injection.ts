import { eventsService } from "./events";
import { AuthController } from "./features/auth/auth.controller";
import { AuthRouter } from "./features/auth/auth.router";
import { AuthService } from "./features/auth/auth.service";
import { CompaniesController } from "./features/companies/companies.controller";
import { CompaniesRouter } from "./features/companies/companies.router";
import { CompaniesService } from "./features/companies/companies.service";
import { CompanyUsersController } from "./features/company-users/company-users.controller";
import { CompanyUsersRouter } from "./features/company-users/company-users.router";
import { CompanyUsersService } from "./features/company-users/company-users.service";
import { EmailValidationController } from "./features/email-validation/email-validation.controller";
import { EmailValidationRouter } from "./features/email-validation/email-validation.router";
import { EmailValidationService } from "./features/email-validation/email-validation.service";

const companiesService = new CompaniesService(eventsService);
const companyUsersService = new CompanyUsersService(eventsService);
const emailValidationService = new EmailValidationService(eventsService);
const authService = new AuthService(eventsService, companyUsersService);

const companiesCtrl = new CompaniesController(
  companiesService,
  companyUsersService,
);
const companyUsersCtrl = new CompanyUsersController(companyUsersService);
const emailValidationCtrl = new EmailValidationController(
  emailValidationService,
);
const authCtrl = new AuthController(authService);

const companiesRouter = new CompaniesRouter(companiesCtrl).router;
const companyUsersRouter = new CompanyUsersRouter(companyUsersCtrl).router;
const emailValidationRouter = new EmailValidationRouter(emailValidationCtrl)
  .router;
const authRouter = new AuthRouter(authCtrl).router;

export {
  companiesService,
  companyUsersService,
  emailValidationService,
  companyUsersRouter,
  companiesRouter,
  emailValidationRouter,
  authRouter,
};
