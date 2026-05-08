import QRCode from "qrcode";
import { catchError } from "../../utils/catchError.js";
import { ApiFeatures } from "./../../utils/ApiFeatures.js";
import { deleteOne } from "../handlers/factor.js";
import { AppError } from "../../utils/App.Error.js";
import { couponModel } from "./../../../databases/models/coupon.model.js";

const createCoupon = catchError(async (req, res, next) => {
  let isCouponExist = await couponModel.findOne({ code: req.body.code });
  if (isCouponExist) return next(new AppError("Coupon already Exists"));

  let results = new couponModel(req.body);
  await results.save();
  res.status(201).json({ message: "success", results });
});

const getAllCoupons = catchError(async (req, res, next) => {
  let apiFeature = new ApiFeatures(couponModel.find(), req.query)
    .paginate()
    .fields()
    .filter()
    .search()
    .sort();
  let results = await apiFeature.mongooseQuery;
  res.json({ message: "success", results });
});

const getCouponById = catchError(async (req, res, next) => {
  let { id } = req.params;
  let results = await couponModel.findOne({ _id: id });

  let url = await QRCode.toDataURL(results);

  res.json({ message: "success", results, url });
  // res.send(`<img src="${url}"/> `);
});

const updateCoupon = catchError(async (req, res, next) => {
  let { id } = req.params;
  let results = await couponModel.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  !results && next(new AppError("not found Review", 404));
  results && res.json({ message: "success", results });
});

const deleteCoupon = deleteOne(couponModel);

export {
  createCoupon,
  getAllCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon,
};
