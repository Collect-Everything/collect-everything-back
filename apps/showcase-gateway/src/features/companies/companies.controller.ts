import { GatewayCrudController } from "@ce/server-core";

class CompaniesCtrl extends GatewayCrudController {
  constructor() {
    super(
      {
        service: "COMPANIES",
      },
      "companies",
    );
  }
}

export const companiesCtrl = new CompaniesCtrl();
