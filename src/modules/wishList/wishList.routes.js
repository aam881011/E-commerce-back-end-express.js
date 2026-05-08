import express from "express";

const wishListRouter = express.Router();

import * as wishList from "./wishList.controller.js";
import { protectedRoutes } from "../auth/auth.controller.js";

wishListRouter
  .route("/")
  .patch(protectedRoutes, wishList.addToWishList)
  .get(protectedRoutes, wishList.getAllWishList)
  .delete(protectedRoutes, wishList.removeFromWishList);

export default wishListRouter;
