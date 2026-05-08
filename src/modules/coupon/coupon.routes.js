import express from "express";
import * as coupon from "./coupon.controller.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
const couponRouter = express.Router();

// category/:cartegoryId/subCategory

couponRouter
  .route("/")
  .post(
    // protectedRoutes,
    coupon.createCoupon
  )
  .get(coupon.getAllCoupons);

couponRouter
  .route("/:id")
  .get(coupon.getCouponById)
  .put(protectedRoutes, allowedTo("admin"), coupon.updateCoupon)
  .delete(protectedRoutes, allowedTo("user"), coupon.deleteCoupon);

export default couponRouter;
