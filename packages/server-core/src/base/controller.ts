export class BaseController {
  constructor(protected readonly name: string) {}

  protected getIdentifier = (methodName: string) => {
    return `[BaseController] ${this.name}.${methodName}`;
  };
}
