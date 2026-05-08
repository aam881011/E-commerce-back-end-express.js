import { Schema, model } from "mongoose";

const subCategorySchema = new Schema(
  {
    name: {
      type: String,
      unique: [true, "name is required"],
      required: true,
      trim: true,
      minlength: [2, "too short subCategory name"],
    },
    slug: {
      type: String,
      lowercase: true,
      required: true,
    },
    category: {
      type: Schema.ObjectId,
      // required: true,
      ref: "category",
    },
    createdBy: {
      type: Schema.ObjectId,
      // required: true,
      ref: "user",
    },
  },
  { timestamps: true }
);
export const subCategoryModel = model("subCategory", subCategorySchema);
