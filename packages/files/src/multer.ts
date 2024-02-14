import fs from "fs";
import { FileHelper } from "./file-helper";
import { Readable } from "stream";
import multer from "multer";
import { Request } from "express";

type Maybe<T> = T | null | undefined;

type ResponseCallback<T> = (err: Error | null, payload?: Maybe<T>) => void;

type RequestHandler<T> = (
  req: Request,
  file: Express.Multer.File,
  responseCb: ResponseCallback<T>,
) => void;

export class FileStorage {
  getDestination: RequestHandler<fs.PathLike> = (_req, _file, responseCb) => {
    responseCb(null, "/dev/null");
  };

  getFilename: RequestHandler<string> = (_req, _file, responseCb) => {
    responseCb(null, FileHelper.formatFilename(_file.originalname));
  };

  _handleFile: RequestHandler<any> = (
    req: Request,
    file: Express.Multer.File,
    responseCb: ResponseCallback<any>,
  ) => {
    this.getDestination(req, file, async (err, path) => {
      if (err !== null) {
        responseCb(err);
      }
      if (path !== null && path !== undefined) {
        const outStream = fs.createWriteStream(path);

        const buffer = await FileHelper.resizeBuffer(file.buffer);

        const stream = Readable.from(buffer);

        stream.pipe(outStream);
        outStream.on("error", responseCb);
        outStream.on("finish", () => {
          responseCb(null, { path, size: outStream.bytesWritten });
        });
      }
    });
  };

  _removeFile: RequestHandler<any> = (
    _req: Request,
    file: Express.Multer.File,
    responseCb: ResponseCallback<any>,
  ) => {
    fs.unlink(file.path, responseCb);
  };

  constructor(opts?: {
    destination?: RequestHandler<string>;
    filename?: RequestHandler<string>;
  }) {
    this.getDestination = opts?.destination ?? this.getDestination;
    this.getFilename = opts?.filename ?? this.getFilename;
  }
}

export const fileFilter: RequestHandler<boolean> = (_req, file, responseCb) => {
  const isImage = FileHelper.isImage(file.originalname);
  if (!isImage) {
    responseCb(
      new Error(
        `[MULTER - fileFilter]: Invalid file type for file : ${
          file.originalname
        } (must be one of these types : ${FileHelper.VALID_IMAGE_EXTENSIONS.join(
          ",",
        )})`,
      ),
      false,
    );
  } else {
    responseCb(null, true);
  }
};

export const createMulterMiddleware = (
  modelFilesPaths?: string[],
  opts: { fileSizeLimit?: number; maxCount?: number } = {
    fileSizeLimit: 50 * 1024 * 1024,
    maxCount: 1,
  },
) => {
  if (!modelFilesPaths) {
    return multer().none();
  }
  const upload = multer({
    storage: new FileStorage(),
    fileFilter,
    limits: {
      fileSize: opts?.fileSizeLimit ?? 50 * 1024 * 1024,
    },
  });
  return upload.fields(
    modelFilesPaths.map((path) => ({
      name: "files." + path,
      maxCount: opts.maxCount,
    })),
  );
};
