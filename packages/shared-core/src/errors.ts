export class EntityValidationError extends Error {
  constructor(public errors: any[]) {
    super("EntityValidationError");
  }
}

export class ValueObjectValidationError extends Error {
  constructor(public errors: any[]) {
    super("ValueObjectValidationError");
  }
}
