export class ProductNotInCartError extends Error {
  constructor() {
    super('Product not in cart');
  }
}
