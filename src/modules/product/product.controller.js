import { AppError } from "../../utils/App.Error.js";
import { catchError } from "../../utils/catchError.js";
import slugify from "slugify";
import { deleteOne } from "../handlers/factor.js";
import { productModel } from "./../../../databases/models/product.model.js";
import { ApiFeatures } from "../../utils/ApiFeatures.js";
// Product
// product
const addProduct = catchError(async (req, res, next) => {
  // req.body
  req.body.imgCover = req.files.imgCover[0].filename;

  req.body.images = req.files.images.map((elm) => elm.filename);

  req.body.slug = slugify(req.body.title);

  const product = new productModel(req.body);
  await product.save();
  res.status(201).json({ message: "success", product });
});

const getAllProducts = catchError(async (req, res, next) => {
  // let mongooseQuery =
  let apiFeatures = new ApiFeatures(productModel.find(), req.query)
    .paginate()
    .fields()
    .filter()
    .search()
    .sort();

  let products = await apiFeatures.mongooseQuery;
  res.status(201).json({
    message: "success",
    PAGE_NUMBER: apiFeatures.PAGE_NUMBER,
    products,
  });
});

const getProduct = catchError(async (req, res, next) => {
  // let categories = await categoryModel.find();
  const { id } = req.params;
  // const { name } = req.body;
  // req.body.slug = slugify(req.body.name);

  let product = await productModel.findById(id);

  // res.status(201).json({ message: "success", category });
  !product && next(new AppError("Product not found", 404));
  product && res.status(201).json({ message: "success", product });
});

const updateProduct = catchError(async (req, res, next) => {
  // let categories = await categoryModel.find();
  const { id } = req.params;
  // const { name } = req.body;
  if (req.body.title) req.body.slug = slugify(req.body.title);

  if (req.files.imgCover) req.body.imgCover = req.files.imgCover[0].filename;
  if (req.files.images)
    req.body.images = req.files.images.map((img) => img.filename);

  let product = await productModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  // res.status(201).json({ message: "success", category });
  !product && next(new AppError("Product not found", 404));
  product && res.status(201).json({ message: "success", product });
});

const deleteProduct = deleteOne(productModel, "product");

export { addProduct, getAllProducts, updateProduct, deleteProduct, getProduct };
