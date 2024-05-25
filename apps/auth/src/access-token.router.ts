import { BaseRouter } from "@ce/server-core";
import { AccessTokenController } from "./access-token.controller";

export class AccessTokenRouter extends BaseRouter {
  constructor(private readonly controller: AccessTokenController) {
    super();

    this.initRoutes();
  }

  initRoutes(): void {
    this.router.post("/create", this.controller.create);
    this.router.post("/verify", this.controller.verify);
  }
}
