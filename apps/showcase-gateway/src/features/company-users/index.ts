import { CompanyUsersController } from "./company-users.controller";
import { CompanyUsersRouter } from "./company-users.router";
import { CompanyUsersService } from "./company-users.service";

const companyUsersService = new CompanyUsersService();

const companyUsersCtrl = new CompanyUsersController(companyUsersService);

const companyUsersRouter = new CompanyUsersRouter(companyUsersCtrl).router;

export { companyUsersRouter };
