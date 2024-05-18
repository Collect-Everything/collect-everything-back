import { GatewayService } from "@ce/server-core";
import { CreateCompanyDTO } from "@ce/shared-core";

export class CompaniesService extends GatewayService {
  constructor() {
    super("companies", {
      gatewayName: "SHOWCASE_GATEWAY",
      serviceName: "COMPANIES",
    });
  }

  async createCompany(data: CreateCompanyDTO) {
    const companyID = await this.fetcher.post("/companies/create", data);
  }
}
