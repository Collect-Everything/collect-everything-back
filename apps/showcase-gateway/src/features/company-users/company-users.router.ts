import { BaseRouter } from "@ce/server-core";
import { CompanyUsersController } from "./company-users.controller";

export class CompanyUsersRouter extends BaseRouter {
  constructor(private readonly companyUsersCtrl: CompanyUsersController) {
    super();

    this.initRoutes();
  }

  initRoutes(): void {
    this.router.post(
      "/register",
      [],
      this.companyUsersCtrl.registerCompanyUser,
    );
  }
}
