import { EventsService, ServerEvent } from "@ce/events";
import { BaseResponse, GatewayService } from "@ce/server-core";

export class CompanyUsersService extends GatewayService {
  constructor(private readonly eventsService: EventsService) {
    super("companyUsers", {
      gatewayName: "ADMIN_GATEWAY",
      serviceName: "COMPANY_USERS",
    });
  }
}
