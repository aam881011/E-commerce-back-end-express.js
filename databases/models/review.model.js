import { Schema, model } from "mongoose";

const reviewSchema = new Schema(
  {
    text: {
      type: String,
      trim: true,
      required: [true, "review comment required"],
    },
    product: {
      type: Schema.ObjectId,
      ref: "product",
      required: true,
    },
    user: {
      type: Schema.ObjectId,
      ref: "user",
      required: true,
    },
    rate: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
    },
  },
  { timestamps: true }
);

reviewSchema.pre(/^find/, function () {
  this.populate("user", "name -_id");
});

export const reviewModel = model("review", reviewSchema);
