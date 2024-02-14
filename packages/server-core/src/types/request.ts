import { Request } from "express";

export interface Req extends Request {
  user?: any;
  lang?: string;
  files?: Record<string, Express.Multer.File[]> | Express.Multer.File[];
}
