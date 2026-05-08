import { Schema, model } from "mongoose";

const couponSchema = new Schema(
  {
    code: {
      type: String,
      trim: true,
      required: [true, "coupon code required"],
      unique: true,
    },
    expires: {
      type: Date,
      required: [true, "coupon date required"],
    },
    discount: {
      type: Number,
      required: [true, "coupon discount required"],
      min: 0,
    },
    createdBy: {
      type: Schema.ObjectId,
      // required: true,
      ref: "user",
    },
  },
  { timestamps: true }
);
export const couponModel = model("coupon", couponSchema);
