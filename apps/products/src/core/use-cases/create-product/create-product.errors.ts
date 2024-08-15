export class CategoryNotFoundError extends Error {
  constructor(categoryName: string) {
    super(`Category ${categoryName} not found`);
  }
}
