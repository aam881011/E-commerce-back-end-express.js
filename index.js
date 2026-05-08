process.on("uncaughtException", (err) => {
  console.log("error", err);
});

import { v2 as cloudinary } from "cloudinary";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { dbConnection } from "./databases/dbConnection.js";
import { photoModel } from "./databases/models/photo.model.js";
import { bootstrap } from "./src/modules/bootstrap.js";
import { uploadToCloudMixOfFiles } from "./src/services/multer/uploadToCloud.js";

dotenv.config();
const app = express();
const port = 3004;

// const upload = multer({ dest: 'uploads/' })

app.use(express.static("uploads"));
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
dbConnection();
bootstrap(app);
// app.use(express.urlencoded({ extended: true }));

//-----------------------------------------------

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.post(
  "/photos",
  uploadToCloudMixOfFiles("img", "test"),
  async (req, res) => {
    cloudinary.uploader.upload(req.files.img[0].path, async (error, result) => {
      req.body.img = result.secure_url;
      await photoModel.insertMany(req.body);
      res.json({ message: "success" });
    });
  }
);

// cloudinary.uploader.upload(
//   "https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
// { public_id: "olympic_flag" },
//   function (error, result) {
//     console.log(result);
//   }
// );

//-----------------------------------------------

process.on("unhandledRejection", (err) => {
  console.log("error", err);
});

app.listen(process.env.PORT || port, () => {
  console.log(`listening on port ${port}`);
});
