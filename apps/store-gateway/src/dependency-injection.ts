import { eventsService } from './events';
import { AuthController } from './features/auth/auth.controller';
import { AuthRouter } from './features/auth/auth.router';
import { AuthService } from './features/auth/auth.service';
import { CompaniesController } from './features/companies/companies.controller';
import { CompaniesRouter } from './features/companies/companies.router';
import { CompaniesService } from './features/companies/companies.service';
import { EmailValidationController } from './features/email-validation/email-validation.controller';
import { EmailValidationRouter } from './features/email-validation/email-validation.router';
import { EmailValidationService } from './features/email-validation/email-validation.service';
import { CompanyCustomersService } from './features/company-customers/company-customers.service';

const companiesService = new CompaniesService(eventsService);

const companyCustomersService = new CompanyCustomersService(eventsService);
const emailValidationService = new EmailValidationService(eventsService);
const authService = new AuthService(eventsService, companyCustomersService);

const companiesCtrl = new CompaniesController(companiesService);
const emailValidationCtrl = new EmailValidationController(
  emailValidationService
);
const authCtrl = new AuthController(authService);

const companiesRouter = new CompaniesRouter(companiesCtrl).router;
const emailValidationRouter = new EmailValidationRouter(emailValidationCtrl)
  .router;
const authRouter = new AuthRouter(authCtrl).router;

export {
  companiesService,
  emailValidationService,
  companiesRouter,
  emailValidationRouter,
  authRouter,
  companyCustomersService
};
