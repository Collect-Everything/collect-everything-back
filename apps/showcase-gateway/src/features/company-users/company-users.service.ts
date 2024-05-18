import { GatewayService } from "@ce/server-core";
import { CreateCompanyUserDTO } from "@ce/shared-core";

export class CompanyUsersService extends GatewayService {
  constructor() {
    super("companyUsers", {
      gatewayName: "SHOWCASE_GATEWAY",
      serviceName: "COMPANY_USERS",
    });
  }

  async create(data: CreateCompanyUserDTO) {
    await this.fetcher.post("/company-users/", data);
  }
}
