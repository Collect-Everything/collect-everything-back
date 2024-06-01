import { BaseRouter } from "@ce/server-core";
import { CompanyUserController } from "./company-user.controller";

export class CompanyUserRouter extends BaseRouter {
  constructor(private readonly controller: CompanyUserController) {
    super();

    this.initRoutes();
  }

  initRoutes() {
    this.router.post("/register", this.controller.register);

    this.router.post("/validate-email", this.controller.validateEmail);

    this.router.post(
      "/validate-credentials",
      this.controller.validateCredentials,
    );

    this.router.patch("/:id", this.controller.update);
    this.router.delete("/:id", this.controller.delete);
  }
}
