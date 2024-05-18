import express from "express";

export abstract class BaseRouter {
  router: express.Router;
  constructor() {
    this.router = express.Router({ mergeParams: true });
  }

  initRoutes() {
    throw new Error(
      `initRoutes method not implemented in ${this.constructor.name}`,
    );
  }
}
