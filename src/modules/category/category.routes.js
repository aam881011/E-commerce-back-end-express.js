import express from "express";
import { validate } from "../../middleware/validate.js";
import { uploadSingleFile } from "../../services/multer/multer.js";
import subCategoryRouter from "../subcategory/subcategory.routes.js";
import * as category from "./category.controller.js";
import {
  addCategoryValidation,
  // deleteCategoryValidation,
  // getCategoryByIdValidation,
  paramsIdVal,
  updateCategoryValidation,
} from "./category.validation.js";

const categoryRouter = express.Router();

// categoryRouter.use("/:id/category/subcategories", subCategoryRouter);
categoryRouter.use("/:id/subCategory", subCategoryRouter);

categoryRouter
  .route("/")
  .post(
    uploadSingleFile("image", "category"),
    validate(addCategoryValidation),
    category.addCategory
  )
  .get(category.getAllCategories);

categoryRouter
  .route("/:id")
  .put(validate(updateCategoryValidation), category.updateCategory)
  .get(validate(paramsIdVal), category.getCategoryById)
  .delete(validate(paramsIdVal), category.deleteCategory);

export default categoryRouter;
