import { GatewayController } from "@ce/server-core";

class CompaniesCtrl extends GatewayController {
  constructor() {
    super("companies", {
      service: "COMPANIES",
    });
  }
}

export const companiesCtrl = new CompaniesCtrl();
