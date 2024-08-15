import { EventsService, ServerEvent } from "@ce/events";
import { BaseResponse, GatewayService } from "@ce/server-core";

export class CompanyCustomersService extends GatewayService {
  constructor(private readonly eventsService: EventsService) {
    super("companyCustomers", {
      gatewayName: "ADMIN_GATEWAY",
      serviceName: "COMPANY_CUSTOMERS",
    });
  }
}
