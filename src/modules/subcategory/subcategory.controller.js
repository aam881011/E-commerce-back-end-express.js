import slugify from "slugify";

import { AppError } from "../../utils/App.Error.js";
import { catchError } from "../../utils/catchError.js";
import { subCategoryModel } from "./../../../databases/models/subcategory.model.js";
import { deleteOne } from "../handlers/factor.js";
import { ApiFeatures } from "./../../utils/ApiFeatures.js";

const addSubCategory = catchError(async (req, res, next) => {
  // req.body.slug = slugify(req.body.name);
  // const subcategory = new subCategoryModel(req.body);

  let { name, categoryId } = req.body;
  let subcategory = new subCategoryModel({
    name,
    slug: slugify(name),
    category: categoryId,
  });

  await subcategory.save();
  res.status(201).json({ message: "success", subcategory });
});

const getAllSubCategories = catchError(async (req, res, next) => {
  // let filterObj = {};
  // if (req.params.category) {
  //   filterObj = req.params;
  // }
  let filters = {};
  if (req.params && req.params.id) {
    filters = {
      category: req.params.id,
    };
  }

  // let subcategory = await subCategoryModel.find(filterObj);

  // res.status(201).json({ message: "success", subcategory });

  let apiFeatures = new ApiFeatures(subCategoryModel.find(), req.query)
    .paginate()
    .fields()
    .filter()
    .search()
    .sort();

  let subcategory = await apiFeatures.mongooseQuery;

  res.status(201).json({
    message: "success",
    PAGE_NUMBER: apiFeatures.PAGE_NUMBER,
    subcategory,
  });
});

const getSubCategory = catchError(async (req, res, next) => {
  // let categories = await categoryModel.find();
  const { id } = req.params;
  // const { name } = req.body;
  // req.body.slug = slugify(req.body.name);

  let subcategory = await subCategoryModel.findById(id);

  // res.status(201).json({ message: "success", category });
  !subcategory && next(new AppError("subCategory not found", 404));
  subcategory && res.status(201).json({ message: "success", subcategory });
});

const updateSubCategory = catchError(async (req, res, next) => {
  // let categories = await subCategoryModel.find();
  const { id } = req.params;
  // const { name } = req.body;
  if (req.body.name) req.body.slug = slugify(req.body.name);

  let subcategory = await subCategoryModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  // res.status(201).json({ message: "success", category });
  !subcategory && next(new AppError("subCategory not found", 404));
  subcategory && res.status(201).json({ message: "success", subcategory });
});

const deleteSubCategory = deleteOne(subCategoryModel, "subCategory");

export {
  addSubCategory,
  getAllSubCategories,
  updateSubCategory,
  deleteSubCategory,
  getSubCategory,
};
