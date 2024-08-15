import { EventsService } from "@ce/events";
import { BaseResponse, GatewayService } from "@ce/server-core";

export class CompaniesService extends GatewayService {
  constructor(private readonly eventsService: EventsService) {
    super("companies", {
      gatewayName: "ADMIN_GATEWAY",
      serviceName: "COMPANIES",
    });
  }
}
