import { removeWhitespace } from "@ce/utils";
import path from "path";
import Jimp from "jimp";

export class FileHelper {
  static VALID_IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
  static VALID_DOCUMENT_EXTENSIONS = [".pdf", ".doc", ".docx", ".ppt", ".pptx"];

  static get VALID_EXTENSIONS() {
    return [
      ...FileHelper.VALID_IMAGE_EXTENSIONS,
      ...FileHelper.VALID_DOCUMENT_EXTENSIONS,
    ];
  }

  static isImage(fileName: string) {
    return FileHelper.VALID_IMAGE_EXTENSIONS.includes(
      path.extname(fileName).toLowerCase(),
    );
  }

  static isDocument(fileName: string) {
    return FileHelper.VALID_DOCUMENT_EXTENSIONS.includes(
      path.extname(fileName).toLowerCase(),
    );
  }

  static formatFilename(filename: string) {
    const reformattedFilename = FileHelper.removeExtension(
      removeWhitespace(filename),
    );
    const date = new Date();
    const dateStr = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    const randomStr = Math.random().toString(36).substring(2, 15);
    const extension = FileHelper.isImage(filename)
      ? ".webp"
      : FileHelper.getExtension(filename);
    return `${reformattedFilename}_${dateStr}_${randomStr}${extension}`;
  }

  static checkExtension(filename: string) {
    const extension = path.extname(filename).toLowerCase();
    if (!FileHelper.VALID_EXTENSIONS.includes(extension)) {
      throw new Error("invalid file type");
    }
  }

  static removeExtension(filename: string) {
    const extension = FileHelper.getExtension(filename);

    return filename.replace(extension, "");
  }

  static resizeBuffer(buffer: Buffer, size = 1440) {
    return Jimp.read(buffer).then((image) => {
      return image
        .resize(size, Jimp.AUTO)
        .quality(75)
        .getBufferAsync(Jimp.MIME_PNG);
    });
  }

  static getExtension(filename: string) {
    return path.extname(filename).toLowerCase();
  }

  static async getBuffer(file: File) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    return FileHelper.isImage(file.name)
      ? await FileHelper.resizeBuffer(buffer)
      : buffer;
  }
}
