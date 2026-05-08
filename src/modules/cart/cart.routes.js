import express from "express";
import * as cart from "./cart.controller.js";
import { protectedRoutes } from "../auth/auth.controller.js";
const cartRouter = express.Router();

// category/:cartegoryId/subCategory

cartRouter
  .route("/")
  .post(protectedRoutes, cart.createCart)
  .get(protectedRoutes, cart.getCart);
cartRouter.route("/:id").delete(protectedRoutes, cart.removeCartItem);

cartRouter.put("/:code", protectedRoutes, cart.applyCoupon);

export default cartRouter;
