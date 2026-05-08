// uploadToCloud

import { v4 as uuidv4 } from "uuid";
import multer from "multer";
import { AppError } from "../../utils/App.Error.js";

function refactorMulter(folderName) {
  const storage = multer.diskStorage({});

  function fileFilter(req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new AppError("images only", 401), false);
    }
  }

  const upload = multer({ storage, fileFilter });
  return upload;
}

export const uploadSingleFile = (fieldName, folderName) => {
  return refactorMulter(folderName).single(fieldName);
};

export const uploadToCloudMixOfFiles = (arrayOfFields, folderName) => {
  return refactorMulter(folderName).fields(arrayOfFields);
};
