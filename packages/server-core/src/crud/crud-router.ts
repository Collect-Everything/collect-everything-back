import express, { RequestHandler } from "express";
import { ICrudController } from "../types";
import { createMulterMiddleware } from "@ce/files";

export const CRUD_ROUTES = {
  LIST: "/",
  GET: "/:itemId",
  CREATE: "/",
  PATCH: "/:itemId",
  DELETE: "/:itemId",
};

export type CrudRouterConfig = {
  middlewares?: {
    list?: RequestHandler[];
    get?: RequestHandler[];
    create?: RequestHandler[];
    patch?: RequestHandler[];
    delete?: RequestHandler[];
  };
  modelFilesPaths?: string[];
  ctrl: ICrudController;
};

export abstract class CrudRouter {
  readonly router = express.Router({ mergeParams: true });
  protected multerMiddleware: RequestHandler;

  protected constructor(config: CrudRouterConfig) {
    const { middlewares, ctrl, modelFilesPaths } = config;
    this.multerMiddleware = createMulterMiddleware(modelFilesPaths);
    this.addRoutesBeforeCrud();

    this.router.get(CRUD_ROUTES.LIST, middlewares?.list ?? [], ctrl.list);
    this.router.get(CRUD_ROUTES.GET, middlewares?.get ?? [], ctrl.get);
    this.router.patch(
      CRUD_ROUTES.PATCH,
      [...(middlewares?.patch ?? []), this.multerMiddleware],
      ctrl.patch,
    );
    this.router.post(
      CRUD_ROUTES.CREATE,
      [...(middlewares?.create ?? []), this.multerMiddleware],
      ctrl.create,
    );
    this.router.delete(
      CRUD_ROUTES.DELETE,
      middlewares?.delete ?? [],
      ctrl.delete,
    );
  }

  protected addRoutesBeforeCrud() {}
}
