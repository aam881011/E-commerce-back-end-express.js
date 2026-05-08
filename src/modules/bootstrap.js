import addressRouter from "./address/address.routes.js";
import authRouter from "./auth/auth.routes.js";
import brandRouter from "./brand/brand.routes.js";
import cartRouter from "./cart/cart.routes.js";
import categoryRouter from "./category/category.routes.js";
import couponRouter from "./coupon/coupon.routes.js";
import orderRoute from "./order/order.routes.js";
import productRouter from "./product/product.routes.js";
import reviewRouter from "./review/review.routes.js";
import subCategoryRouter from "./subcategory/subcategory.routes.js";
import userRouter from "./user/user.routes.js";
import wishListRouter from "./wishList/wishList.routes.js";

export function bootstrap(app) {
  app.get("/", (req, res) => res.send("Hello World!"));

  app.use("/api/v1/categories", categoryRouter);
  app.use("/api/v1/subcategories", subCategoryRouter);
  app.use("/api/v1/brands", brandRouter);
  app.use("/api/v1/products", productRouter);
  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/reviews", reviewRouter);
  app.use("/api/v1/wishlist", wishListRouter);
  app.use("/api/v1/address", addressRouter);
  app.use("/api/v1/coupons", couponRouter);
  app.use("/api/v1/carts", cartRouter);
  app.use("/api/v1/orders", orderRoute);

  app.all("*", (req, res, next) => {
    next(new Error(`not found endpoint ${req.originalUrl}`));
  });

  //globalErorMiddleware
  app.use((err, req, res, next) => {
    let code = err.statusCode || 500;
    let error = err.message;
    res.status(code).json({
      error,
      // add in production mode
      // stack: err.stack
    });
  });
}
