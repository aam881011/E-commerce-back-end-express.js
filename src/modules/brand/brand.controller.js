import { AppError } from "../../utils/App.Error.js";
import { catchError } from "../../utils/catchError.js";
import slugify from "slugify";
import { brandModel } from "./../../../databases/models/brand.model.js";
import { deleteOne } from "../handlers/factor.js";
import { ApiFeatures } from "./../../utils/ApiFeatures.js";

const addBrand = catchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  req.body.logo = req.file.filename;

  const brand = new brandModel(req.body);
  await brand.save();
  res.status(201).json({ message: "success", brand });
});

const getAllBrands = catchError(async (req, res, next) => {
  // let brands = await brandModel.find();

  // res.status(201).json({ message: "success", brands });

  let apiFeatures = new ApiFeatures(brandModel.find(), req.query)
    .paginate()
    .fields()
    .filter()
    .search()
    .sort();

  let brands = await apiFeatures.mongooseQuery;
  res.status(201).json({
    message: "success",
    PAGE_NUMBER: apiFeatures.PAGE_NUMBER,
    brands,
  });
});

const getBrandById = catchError(async (req, res, next) => {
  let { id } = req.params;
  let results = await brandModel.findById(id);
  res.json({ message: "success", results });
});


const updateBrand = catchError(async (req, res, next) => {
  // let categories = await categoryModel.find();
  const { id } = req.params;
  // const { name } = req.body;
  req.body.slug = slugify(req.body.name);
  if (req.file) req.body.logo = req.file.filename;

  let brand = await brandModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  // res.status(201).json({ message: "success", category });
  !brand && next(new AppError("category not found", 404));
  brand && res.status(201).json({ message: "success", brand });
});

const deleteBrand = deleteOne(brandModel, "brand");

export { addBrand, getAllBrands,getBrandById, updateBrand, deleteBrand };
