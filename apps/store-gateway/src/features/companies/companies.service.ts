import { EventsService } from "@ce/events";
import { GatewayService } from "@ce/server-core";

export class CompaniesService extends GatewayService {
  constructor(private readonly eventsService: EventsService) {
    super("companies", {
      gatewayName: "STORE_GATEWAY",
      serviceName: "COMPANIES",
    });
  }
}
