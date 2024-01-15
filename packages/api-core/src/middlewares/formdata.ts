import { RequestHandler } from "express";
import { FileService } from "../lib/files";

export const handleFormdataBody: (fileService: FileService) => RequestHandler =
  (fileService: FileService) => (req, res, next) => {
    req.body = JSON.parse(req.body.data);

    if (req.file) {
      const file = {
        name: req.file.filename,
        url: fileService.getPublicUrl(req.file.filename),
        size: req.file.size,
        type: req.file.mimetype,
      };
      req.body[req.file.fieldname] = file;
    }
    next();
  };
