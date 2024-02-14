import { TListQuery } from "./api";
import { RequestHandler } from "express";

export interface ICrudService<
  TModelBase extends Object,
  TModel extends Object,
  OrmModel extends unknown,
> {
  get: (itemId: string) => Promise<OrmModel | null>;
  list: (query: TListQuery) => Promise<OrmModel[]>;
  create: (item: TModelBase) => Promise<OrmModel>;
  update: (itemId: string, item: Partial<TModel>) => Promise<OrmModel | null>;
  delete: (itemId: string) => Promise<OrmModel | undefined>;
  count: (query: TListQuery) => Promise<number>;
}

export interface ICrudController<T> {
  list: RequestHandler;
  get: RequestHandler;
  create: RequestHandler;
  patch: RequestHandler;
  delete: RequestHandler;
}
