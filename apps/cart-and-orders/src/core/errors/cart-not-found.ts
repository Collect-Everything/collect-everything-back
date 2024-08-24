export class CartNotFoundError extends Error {
  constructor() {
    super('Cart not found');
  }
}
