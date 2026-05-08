import { Schema, model } from "mongoose";

const brandSchema = new Schema(
  {
    name: {
      type: String,
      unique: [true, "name is required"],
      trim: true,
      required: true,
      minLength: [2, "too short brand name"],
    },
    slug: {
      type: String,
      lowercase: true,
      required: true,
    },
    logo: String,
    createdBy: {
      type: Schema.ObjectId,
      // required: true,
      ref: "user",
    },
  },
  { timestamps: true }
);

brandSchema.post("init", (doc) => {
  doc.logo = process.env.BASE_URL + "brand/" + doc.logo;
});

export const brandModel = model("brand", brandSchema);
