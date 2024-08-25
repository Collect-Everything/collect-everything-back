import multer from 'multer';
import { STATIC_PATH, UPLOAD_PATH, apiConfig } from '../config/api.config';
import { slugify } from '@ce/utils';
import * as fs from 'fs';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadFolderExists = fs.existsSync(UPLOAD_PATH);

    if (!uploadFolderExists) {
      fs.mkdirSync(UPLOAD_PATH, { recursive: true });
    }

    cb(null, UPLOAD_PATH);
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split('.').pop();
    const fileNameWithoutExt = file.originalname.replace(/\.[^/.]+$/, '');

    const fileName = Date.now() + '-' + slugify(fileNameWithoutExt) + '.' + ext;

    cb(null, fileName); // nom des fichiers stockés
  }
});

export const upload = multer({ storage: storage });

export const getFileUrl = (filename: string) => {
  return apiConfig.baseUrl + STATIC_PATH + '/' + filename;
};
