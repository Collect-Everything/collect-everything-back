import { GatewayCrudController } from "@ce/server-core";

class CompanyUsersCtrl extends GatewayCrudController {
  constructor() {
    super(
      {
        service: "COMPANY_USERS",
      },
      "company_users",
    );
  }
}

export const companyUsersCtrl = new CompanyUsersCtrl();
