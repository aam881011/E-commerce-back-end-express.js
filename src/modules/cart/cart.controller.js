import { cartModel } from "../../../databases/models/cart.model.js";
import { productModel } from "../../../databases/models/product.model.js";
import { couponModel } from "../../../databases/models/coupon.model.js";
import { catchError } from "../../utils/catchError.js";
import { AppError } from "../../utils/App.Error.js";

function calcPrice(cart) {
  let totalPrice = 0;
  cart.cartItems.forEach((ele) => {
    totalPrice += ele.quantity * ele.price;
  });

  cart.totalPrice = totalPrice;
}

const createCart = catchError(async (req, res, next) => {
  let product = await productModel.findById(req.body.product).select("price");
  !product && next(new AppError("product not found", 404));
  // userID :::::::: > req.user._id
  req.body.price = product.price;
  let isCartExist = await cartModel.findOne({ user: req.user._id });
  if (!isCartExist) {
    let cart = new cartModel({
      user: req.user._id,
      cartItems: [req.body],
    });

    calcPrice(cart);
    await cart.save();
    return res.status(201).json({ message: "created", cart });
  }

  let item = isCartExist.cartItems.find(
    (ele) => ele.product == req.body.product
  );
  // console.log(item);
  if (item) {
    item.quantity += 1;
  } else {
    isCartExist.cartItems.push(req.body);
  }

  calcPrice(isCartExist);
  if (isCartExist.discount)
    isCartExist.totalPriceAfterDiscount =
      isCartExist.totalPrice -
      (isCartExist.totalPrice * isCartExist.discount) / 100;

  await isCartExist.save();
  res.json({ message: "success", isCartExist });
});

const getCart = catchError(async (req, res, next) => {
  let cart = await cartModel.findOne({ user: req.user._id });

  res.json({ message: "success", cart });
});

const removeCartItem = catchError(async (req, res, next) => {
  let cart = await cartModel.findOneAndUpdate(
    { user: req.user._id },
    { $pull: { cartItems: { _id: req.params.id } } },
    { new: true }
  );
  calcPrice(cart);
  // diiscount
  res.json({ message: "success", cart });
});

const updateCart = catchError(async (req, res, next) => {
  let product = await productModel.findById(req.body.product).select("price");
  !product && next(new AppError("product not found", 404));
  // userID :::::::: > req.user._id
  req.body.price = product.price;
  let isCartExist = await cartModel.findOne({ user: req.user._id });

  let item = isCartExist.cartItems.find(
    (ele) => ele.product == req.body.product
  );

  !item && next(new AppError("Product not found in the cart", 404));
  if (item) {
    item.quantity = req.body.quantity;
  }
  calcPrice(isCartExist);

  await isCartExist.save();
  res.json({ message: "success", isCartExist });
});

const applyCoupon = catchError(async (req, res, next) => {
  // 1- get coupon from params
  // 2- get coupon discount
  // 3- calc discount

  let code = await couponModel.findOne({ code: req.params.code });
  let cart = await cartModel.findOne({ user: req.user._id });
  cart.totalPriceAfterDiscount =
    cart.totalPrice - (cart.totalPrice * code.discount) / 100;
  cart.discount = code.discount;
  await cart.save();
  res.json({ message: "success", cart });
});

export { createCart, getCart, removeCartItem, updateCart, applyCoupon };
