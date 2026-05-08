import { Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
    user: {
      type: Schema.ObjectId,
      ref: "user",
    },
    cartItems: [
      {
        product: {
          type: Schema.ObjectId,
          ref: "product",
        },
        quantity: {
          type: Number,
          default: 1,
        },
        price: Number,
      },
    ],
    totalOrderPrice: Number,
    discount: Number,
    totalOrderAfterDiscount: Number,
    paymentMethod: {
      type: String,
      enums: ["cache", "credit"],
      default: "cache",
    },
    shippingAddress: {
      city: String,
      street: String,
    },
    isPaid: Boolean,
    paidAt: Date,
    isDelivered: Boolean,
    createdBy: {
      type: Schema.ObjectId,
      // required: true,
      ref: "user",
    },
  },
  { timestamps: true }
);

export const orderModel = model("order", orderSchema);
