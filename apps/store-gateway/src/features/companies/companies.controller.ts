import { GatewayController } from "@ce/server-core";
import { CompaniesService } from "./companies.service";

export class CompaniesController extends GatewayController {
  constructor(private readonly companiesService: CompaniesService) {
    super("companies");
  }
}
