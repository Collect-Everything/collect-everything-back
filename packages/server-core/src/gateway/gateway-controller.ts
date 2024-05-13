import { GatewayService } from "./gateway-service";

export abstract class GatewayController {
  constructor(
    protected readonly name: string,
    protected readonly service: GatewayService,
  ) {}
  protected getIdentifier = (methodName: string) => {
    return `[GatewayCrudController] ${this.name}.${methodName}`;
  };
}
