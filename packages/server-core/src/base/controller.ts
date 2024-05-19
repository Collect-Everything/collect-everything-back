export class BaseController {
  constructor(protected readonly name: string) {}

  protected getIdentifier = (methodName: string) => {
    return `${this.name}.${methodName}`;
  };
}
