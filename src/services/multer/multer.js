import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { AppError } from "../../utils/App.Error.js";

function refactorMulter(folderName) {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `uploads/${folderName}`);
    },
    filename: (req, file, cb) => {
      // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uuidv4() + " - " + file.originalname);
    },
  });

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

// اكتر من حقل صور
export const uploadMixOfFiles = (arrayOfFields, folderName) => {
  // const storage = multer.diskStorage({
  //   destination: (req, file, cb) => {
  //     cb(null, `uploads/${folderName}`);
  //   },
  //   filename: (req, file, cb) => {
  //     // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
  //     cb(null, uuidv4() + " - " + file.originalname);
  //   },
  // });

  // function fileFilter(req, file, cb) {
  //   if (file.mimetype.startsWith("image")) {
  //     cb(null, true);
  //   } else {
  //     cb(new AppError("images only", 401), false);
  //   }
  // }

  // const upload = multer({ storage, fileFilter });

  return refactorMulter(folderName).fields(arrayOfFields);
};
// export const uploadArrayOfFiles = fieldName => refactorMulter(folderName).array(fieldName,10)

export const uploadArrayOfFiles = (fieldName, folderName) => {
  return refactorMulter(folderName).array(fieldName, 10);
};

// export const uploadArrayOfFiles = fieldName => fileUpload().array(fieldName,10)
