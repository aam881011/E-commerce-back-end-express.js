import express from "express";
import { uploadMixOfFiles } from "../../services/multer/multer.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import * as product from "./product.controller.js";

const productRouter = express.Router();
let arrFields = [
  { name: "imgCover", maxCount: 1 },
  { name: "images", maxCount: 20 },
];

productRouter.use(protectedRoutes, allowedTo("admin", "user"));

productRouter
  .route("/")
  .post(
    // protectedRoutes,
    // allowedTo("admin", "user"),
    uploadMixOfFiles(arrFields, "product"),
    product.addProduct
  )
  .get(product.getAllProducts);

productRouter
  .route("/:id")
  .get(product.getProduct)
  .put(
    // protectedRoutes, allowedTo("admin"),
    product.updateProduct
  )
  .delete(
    // protectedRoutes, allowedTo("admin"),
    product.deleteProduct
  );

export default productRouter;
