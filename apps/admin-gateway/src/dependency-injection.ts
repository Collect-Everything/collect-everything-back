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
import { CompanyCustomersController } from "./features/company-customers/company-customers.controller";
import { CompanyCustomersRouter } from "./features/company-customers/company-customers.router";
import { CompanyCustomersService } from "./features/company-customers/company-customers.service";

import { AdminUsersService } from "./features/admin-users/admin-users.service";

const companiesService = new CompaniesService(eventsService);
const companyUsersService = new CompanyUsersService(eventsService);
const companyCustomersService = new CompanyCustomersService(eventsService);
const adminUsersService = new AdminUsersService(eventsService);
const authService = new AuthService(eventsService, adminUsersService);

const companiesCtrl = new CompaniesController(companiesService);
const companyUsersCtrl = new CompanyUsersController(companyUsersService);
const companyCustomersCtrl = new CompanyCustomersController(companyCustomersService);
const authCtrl = new AuthController(authService);

const companiesRouter = new CompaniesRouter(companiesCtrl).router;
const companyUsersRouter = new CompanyUsersRouter(companyUsersCtrl).router;
const companyCustomersRouter = new CompanyCustomersRouter(companyCustomersCtrl).router;
const authRouter = new AuthRouter(authCtrl).router;

export { companiesService, companiesRouter, companyUsersRouter, companyCustomersRouter, authRouter };