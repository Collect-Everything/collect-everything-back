import { TListQuery } from "./api";
import { RequestHandler } from "express";

export interface ICrudService<
  CreateFields extends Object,
  Mdl extends Object,
  OrmModel extends unknown,
> {
  get: (itemId: number) => Promise<OrmModel | null>;
  list: (query: TListQuery) => Promise<OrmModel[]>;
  create: (item: CreateFields) => Promise<OrmModel>;
  update: (itemId: number, item: Partial<Mdl>) => Promise<OrmModel | null>;
  delete: (itemId: number) => Promise<OrmModel | undefined>;
  count: (query: TListQuery) => Promise<number>;
}

export interface ICrudController<T> {
  list: RequestHandler;
  get: RequestHandler;
  create: RequestHandler;
  patch: RequestHandler;
  delete: RequestHandler;
}
