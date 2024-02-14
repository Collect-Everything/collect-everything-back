import express, { RequestHandler } from "express";
import { ICrudController } from "../types";
import { createMulterMiddleware } from "@ce/files";
import { isAdmin } from "../middlewares/auth";

export type CrudRouterConfig<TModel> = {
  middlewares?: {
    list?: RequestHandler[];
    get?: RequestHandler[];
    create?: RequestHandler[];
    patch?: RequestHandler[];
    delete?: RequestHandler[];
    post?: RequestHandler[];
  };
  modelFilesPaths?: string[];
  frontMiddlewares?: {
    listing?: RequestHandler[];
    one?: RequestHandler[];
    add?: RequestHandler[];
    update?: RequestHandler[];
    delete?: RequestHandler[];
    post?: RequestHandler[];
  };
  frontCtrl?: ICrudController<TModel>;
  backCtrl?: ICrudController<TModel>;
};

export abstract class CrudRouter<TModel> {
  readonly router = express.Router({ mergeParams: true });
  protected multerMiddleware: RequestHandler;

  protected constructor(config: CrudRouterConfig<TModel>) {
    const {
      middlewares,
      modelFilesPaths,
      frontCtrl,
      backCtrl,
      frontMiddlewares,
    } = config;
    this.multerMiddleware = createMulterMiddleware(modelFilesPaths);
    this.addRoutesBeforeCrud();

    if (frontCtrl) {
      this.router.get(
        "/listing",
        frontMiddlewares?.listing ?? [],
        frontCtrl.list,
      );
      this.router.get(
        "/one/:itemId",
        frontMiddlewares?.one ?? [],
        frontCtrl.get,
      );
      this.router.patch(
        "/update/:itemId",
        [...(frontMiddlewares?.update ?? []), this.multerMiddleware],
        frontCtrl.patch,
      );
      this.router.post(
        "/add",
        [...(frontMiddlewares?.add ?? []), this.multerMiddleware],
        frontCtrl.create,
      );
      this.router.delete(
        "/delete/:itemId",
        frontMiddlewares?.delete ?? [],
        frontCtrl.delete,
      );
    }

    if (backCtrl) {
      this.router.get(
        "/",
        [...(middlewares?.list ?? []), isAdmin],
        backCtrl.list,
      );
      this.router.get(
        "/:itemId",
        [...(middlewares?.get ?? []), isAdmin],
        backCtrl.get,
      );
      this.router.patch(
        "/:itemId",
        [...(middlewares?.patch ?? []), isAdmin, this.multerMiddleware],
        backCtrl.patch,
      );
      this.router.post(
        "/",
        [...(middlewares?.create ?? []), isAdmin, this.multerMiddleware],
        backCtrl.create,
      );
      this.router.delete(
        "/:itemId",
        [...(middlewares?.delete ?? []), isAdmin],
        backCtrl.delete,
      );
    }
  }

  protected addRoutesBeforeCrud() {}
}
