export abstract class GatewayController {
  constructor(protected readonly name: string) {}
  protected getIdentifier = (methodName: string) => {
    return `${this.name}.${methodName}`;
  };
}
