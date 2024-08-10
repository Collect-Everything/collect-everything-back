export class CategoryAlreadyExistsError extends Error {
  constructor(name: string) {
    super(`Category with name ${name} already exists`);
  }
}
