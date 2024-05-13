import { GatewayService } from "@ce/server-core";

export class CompaniesService extends GatewayService {
  constructor() {
    super("companies", {
      gatewayName: "SHOWCASE_GATEWAY",
      serviceName: "COMPANIES",
    });
  }
}
