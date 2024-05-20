export class EntityValidationError extends Error {
  constructor(public errors: any[]) {
    super("EntityValidationError");
  }
}

export class ValueObjectValidationError extends Error {
  constructor(
    public name: string,
    public errors: any[],
    message?: string,
  ) {
    super(
      `[${name}] ValueObjectVaLidationError ${message ? " - " + message : ""}`,
    );
  }
}
