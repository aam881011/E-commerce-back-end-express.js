import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    title: {
      type: String,
      unique: [true, "Product title is unique"],
      required: [true, "Product title is required"],
      trim: true,
      minlength: [2, "too short product name"],
    },
    slug: {
      type: String,
      lowercase: true,
      required: true,
    },
    price: {
      type: Number,
      required: [true, "product price required."],
      default: 0,
      min: 0,
    },
    priceAfterDiscount: {
      type: Number,
      default: 0,
      min: 0,
    },
    description: {
      type: String,
      minlength: [5, "too short description name"],
      maxlength: [
        300,
        "description should be lass than or equal to 100 characters",
      ],
      required: [true, "product description required"],
      trim: true,
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
      required: [true, "product quantity required"],
    },
    sold: {
      type: Number,
      default: 0,
      min: 0,
    },
    imgCover: String,
    images: [String],
    category: {
      type: Schema.ObjectId,
      ref: "category",
      required: [true, "product category required"],
    },
    subCategory: {
      type: Schema.ObjectId,
      ref: "subCategory",
      required: [true, "product subcategory required"],
    },
    brand: {
      type: Schema.ObjectId,
      required: [true, "product brand required"],
      ref: "brand",
    },
    ratingAvg: {
      type: Number,
      min: [1, "rating average must be greater then 1"],
      max: [5, "rating average must be less then 1"],
    },
    ratingCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    createdBy: {
      type: Schema.ObjectId,
      // required: true,
      ref: "user",
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

productSchema.post("init", function (doc) {
  doc.imgCover = process.env.BASE_URL + "product/" + doc.imgCover;

  // doc.imgCover = "http://localhost:3004/api/v1/product/" + doc.imgCover;

  // doc.images = doc.images.map(
  //   (elm, index) => "http://localhost:3004/api/v1/product/" + doc.images
  // );

  if (doc.images)
    doc.images = doc.images.map(
      (path) => process.env.BASE_URL + "product/" + path
    );

  // if (doc.imgCover || doc.images) {
  //   doc.imgCover = process.env.baseURL + "uploads/" + doc.imgCover;
  //   doc.images = doc.images?.map((img) => process.env.baseURL + "uploads/" + img);
  // }
});


productSchema.virtual("myReview", {
  ref: "review",
  localField: "_id",
  foreignField: "product",
});
productSchema.pre(/^find/, function () {
  this.populate("myReview");
});

export const productModel = model("product", productSchema);
