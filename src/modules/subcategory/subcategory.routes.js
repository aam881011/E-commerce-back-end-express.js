import express from "express";
import * as subcategory from "./subcategory.controller.js";

const subCategoryRouter = express.Router({ mergeParams: true });

subCategoryRouter
  .route("/")
  .post(subcategory.addSubCategory)
  .get(subcategory.getAllSubCategories);

subCategoryRouter
  .route("/:id")
  .get(subcategory.getSubCategory)
  .put(subcategory.updateSubCategory)
  .delete(subcategory.deleteSubCategory);

export default subCategoryRouter;
