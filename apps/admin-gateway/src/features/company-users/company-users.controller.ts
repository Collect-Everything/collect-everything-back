import { GatewayController } from "@ce/server-core";

class CompanyUsersCtrl extends GatewayController {
  constructor() {
    super("company_users", {
      service: "COMPANY_USERS",
    });
  }
}

export const companyUsersCtrl = new CompanyUsersCtrl();
