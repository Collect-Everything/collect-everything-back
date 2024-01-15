import { slugify } from "../../helpers/string";
import * as fs from "fs";
import * as path from "path";
import { ServiceConfig } from "../service.config";
import sharp from "sharp";

export class FileService {
  maxFileSize = 100 * 1024 * 1024; // 100 MB
  validImageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
  validDocumentExtensions = [".pdf", ".doc", ".docx", ".ppt", ".pptx"];
  uploadPath = `/var/www/uploads/${this.serviceConfig.name}/`;
  publicPath = `${this.serviceConfig.url}/static/`;
  maxImageWidth = 800;

  constructor(private serviceConfig: ServiceConfig) {}

  get validExtensions() {
    return [...this.validImageExtensions, ...this.validDocumentExtensions];
  }

  delete(fileName: string) {
    fs.unlinkSync(this.uploadPath + fileName);
  }

  getPublicUrl(fileName: string) {
    return this.publicPath + fileName;
  }

  getUploadPath(fileName: string) {
    return this.uploadPath + fileName;
  }

  removeFileExtension(fileName: string) {
    return fileName.replace(this.getExtension(fileName), "");
  }

  formatFileName(fileName: string) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const formattedFilename = this.removeFileExtension(fileName);
    return slugify(formattedFilename) + "-" + uniqueSuffix;
  }

  getExtension(fileName: string) {
    return path.extname(fileName).toLowerCase();
  }

  isValidFile(filename: string) {
    return this.validExtensions.includes(this.getExtension(filename));
  }

  async formatImage(filePath: string) {
    const image = sharp(filePath);
    const metadata = await image.metadata();

    if (metadata.width && metadata.width > this.maxImageWidth) {
      image.resize(this.maxImageWidth);
    }

    return image.toFormat("webp", { quality: 100 }).toBuffer();
  }
}
