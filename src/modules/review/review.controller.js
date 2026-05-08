import { AppError } from "../../utils/App.Error.js";
import { catchError } from "../../utils/catchError.js";
import slugify from "slugify";
import { brandModel } from "../../../databases/models/brand.model.js";
import { deleteOne } from "../handlers/factor.js";
import { reviewModel } from "./../../../databases/models/review.model.js";
import { ApiFeatures } from './../../utils/ApiFeatures.js';

// review
// Review

const addReview = catchError(async (req, res, next) => {
  req.body.user = req.body.user._id
  let isReview = await reviewModel.findOne({user:req.user._id, product: req.body.product })
  if (isReview)  return next(new AppError("you created a review before",409))


  let review = new reviewModel(req.body);
  await review.save();
  res.status(201).json({ message: "success", review });
});

const getAllReviews = catchError(async (req, res, next) => {
  // let brands = await brandModel.find();

  // res.status(201).json({ message: "success", brands });

  let apiFeatures = new ApiFeatures(reviewModel.find(), req.query)
    .paginate()
    .fields()
    .filter()
    .search()
    .sort();

  let reviews = await apiFeatures.mongooseQuery
  res.status(201).json({
    message: "success",
    PAGE_NUMBER: apiFeatures.PAGE_NUMBER,
    reviews,
  });
});

const getReview = catchError(async (req, res, next) => {
  const { id } = req.params;

  let review = await productModel.findById(id);

  !review && next(new AppError("category not found", 404));
  review && res.status(201).json({ message: "success", review });
});

const updateReview = catchError(async (req, res, next) => {
  const { id } = req.params;

  let review = await reviewModel.findByIdAndUpdate({_id:id, user: req.user._id}, req.body, {
    new: true,
  });

  !review && next(new AppError("review not found or you are not authorized to perform this action"), 404);
  review && res.status(201).json({ message: "success", review });
});

const deleteReview = deleteOne(reviewModel, "review");

export { addReview, getAllReviews,getReview, updateReview, deleteReview };
