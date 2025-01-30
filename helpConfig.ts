import { BadRequestException } from "@nestjs/common";
import { diskStorage } from "multer";
import { v4 as uuidv4 } from 'uuid';

export const SALT_ROUNDS = 12;
export const JWT_SECRET = {
    secret: 'ss17986'
}

export const IMG_COUNT = 10;

export const JWT_EXPIRATION = {
    time: '1d'
}

export const ROOT_PATH= "C:\Users\SS\Desktop\nestjs proj rwa\rwa-proj\assets";
export const UPLOAD_DESTINATION ="./assets";

export const FILE_CONF = {
    storage: diskStorage({
      destination: UPLOAD_DESTINATION,
      filename: (req, file, cb) => {
        const name = uuidv4();
        const ext = file.originalname.split('.').pop();
        cb(null, `${name}.${ext}`);
      },
    }),
    fileFilter: (req, file, cb) => {
      if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new BadRequestException('InvalidImageType'), false);
      }
      cb(null, true);
    },
  };
