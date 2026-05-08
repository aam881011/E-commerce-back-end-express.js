import express from "express";

const addressRouter = express.Router();

import * as address from "./address.controller.js";
import { protectedRoutes } from "../auth/auth.controller.js";

addressRouter
  .route("/")
  .patch(protectedRoutes, address.addAddress)
  .get(protectedRoutes, address.removeAddress)
  .delete(protectedRoutes, address.getAllAddress);

export default addressRouter;
