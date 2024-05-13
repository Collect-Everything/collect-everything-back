import express from "express";

export class BaseRouter {
  router: express.Router;
  constructor() {
    this.router = express.Router({ mergeParams: true });

    this.initRoutes();
  }

  initRoutes() {
    throw new Error(
      `initRoutes method not implemented in ${this.constructor.name}`,
    );
  }
}
