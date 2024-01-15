import multer, { StorageEngine } from "multer";
import { ERRORS_KEYS, errorsBuilders } from "../helpers/error-builder";
import { RequestHandler } from "express";
import * as fs from "fs";
import { FileService } from "./files/file.service";
import { ServiceConfig } from "./service.config";

export const createMulterStorage = (
  serviceConfig: ServiceConfig,
  fileService: FileService,
) =>
  multer.diskStorage({
    destination: function (_req, _file, cb) {
      const tmpDest = `/tmp/${serviceConfig.name}`;
      if (!fs.existsSync(tmpDest)) {
        fs.mkdirSync(tmpDest);
      }

      cb(null, tmpDest);
    },
    filename: function (req, file, cb) {
      cb(null, fileService.formatFileName(file.originalname));
    },
  });

export const createMulterUpload = (
  fileService: FileService,
  storage: StorageEngine,
) =>
  multer({
    storage: storage,
    fileFilter: (_req, file, callback) => {
      if (!fileService.isValidFile(file.originalname)) {
        return callback(errorsBuilders(ERRORS_KEYS.global.invalidFileType));
      }
      callback(null, true);
    },
    limits: {
      fileSize: fileService.maxFileSize,
    },
  });

export const createTmpFileHandler: (
  fileService: FileService,
) => RequestHandler = (fileService: FileService) => (req, res, next) => {
  if (!req.file) {
    return next();
  }

  fileService.formatImage(req.file.path).then((data) => {
    if (!req.file) {
      return next();
    }
    fs.rmSync(req.file.path, { force: true });
    const dest = fileService.uploadPath;
    const fileName = req.file.filename + ".webp";
    req.file.filename = fileName;
    const filePath = `${dest}${fileName}`;
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest);
    }
    fs.writeFile(filePath, data, (err) => {
      if (err) {
        return next(err);
      }
      req.file!.path = filePath;
      next();
    });
  });
};
