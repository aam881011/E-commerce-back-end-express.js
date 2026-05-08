import express from "express";
import * as brand from "./brand.controller.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";

import { uploadSingleFile } from "../../services/multer/multer.js";
import { validate } from "../../middleware/validate.js";
import { createBrandSchema } from "./brand.validation.js";

const brandRouter = express.Router();

brandRouter
  .route("/")
  .get(brand.getAllBrands)
  .post(
    protectedRoutes,
    allowedTo("admin"),
    uploadSingleFile("image", "brand"),
    validate(createBrandSchema),
    brand.addBrand
  );

brandRouter
  .route("/:id")
  .get(protectedRoutes, allowedTo("admin"), brand.getBrandById)
  .put(validate(createBrandSchema),protectedRoutes, allowedTo("admin"), brand.updateBrand)
  .delete(protectedRoutes, allowedTo("admin"), brand.deleteBrand);

export default brandRouter;
