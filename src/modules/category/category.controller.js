import { ApiFeatures } from "../../utils/ApiFeatures.js";
import { AppError } from "../../utils/App.Error.js";
import { catchError } from "../../utils/catchError.js";
import { deleteOne } from "../handlers/factor.js";
import { categoryModel } from "./../../../databases/models/category.model.js";
import slugify from "slugify";

const addCategory = catchError(async (req, res, next) => {
  req.body.image = req.file.filename;
  req.body.slug = slugify(req.body.name);

  const category = new categoryModel(req.body);
  await category.save();
  res.status(201).json({ message: "success", category });
});

const getAllCategories = catchError(async (req, res, next) => {
  // let categories = await categoryModel.find();

  let apiFeatures = new ApiFeatures(categoryModel.find(), req.query)
    .paginate()
    .fields()
    .filter()
    .search()
    .sort();

  let categories = await apiFeatures.mongooseQuery;
  res.status(201).json({
    message: "success",
    PAGE_NUMBER: apiFeatures.PAGE_NUMBER,
    categories,
  });
});

const getCategoryById = catchError(async (req, res, next) => {
  let { id } = req.params;
  let category = await categoryModel.findById(id);
  // res.json({ message: "success", results });

  !category && next(new AppError("category not found", 404));
  category && res.status(201).json({ message: "success", category });
});

const updateCategory = catchError(async (req, res, next) => {
  // const { id } = req.params;

  if (req.file.name) req.body.slug = slugify(req.body.name);

  if (req.file) req.body.image = req.file.filename;

  let category = await categoryModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  // res.status(201).json({ message: "success", category });
  !category && next(new AppError("category not found", 404));
  category && res.status(201).json({ message: "success", category });
});

const deleteCategory = deleteOne(categoryModel, "category");

export {
  addCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
  getCategoryById,
};
