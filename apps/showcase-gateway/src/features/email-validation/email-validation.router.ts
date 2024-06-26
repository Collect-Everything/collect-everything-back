import { BaseRouter } from "@ce/server-core";
import { EmailValidationController } from "./email-validation.controller";

export class EmailValidationRouter extends BaseRouter {
  constructor(private readonly controller: EmailValidationController) {
    super();

    this.initRoutes();
  }

  initRoutes() {
    this.router.get("/token/:token", this.controller.checkValidationToken);
  }
}
