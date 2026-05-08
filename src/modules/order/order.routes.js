import express from "express";
import * as order from "./order.controller.js";
const orderRoute = express.Router();
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";

// category/:cartegoryId/subCategory

orderRoute.route("/:id").post(protectedRoutes, order.createCacheOrder);
orderRoute.route("/checkout/:id").post(protectedRoutes, order.onlinePayment);
orderRoute.route("/").get(protectedRoutes, order.getOrder);
// .get(protectRoutes, order.getCart);
// cartRouter.route("/:id").delete(protectRoutes,cart.removeCartItem);

// cartRouter.put("/:code",protectRoutes,cart.applyCoupon)
// .get(reviewController.getReviewById).put(protectRoutes, reviewController.updateReview)

export default orderRoute;
