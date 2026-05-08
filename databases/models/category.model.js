import { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      unique: [true, "name is required"],
      required: true,
      trim: true,
      minlength: [2, "too short category name"],
    },
    slug: {
      type: String,
      lowercase: true,
      required: true,
    },
    image: String,
    createdBy: {
      type: Schema.ObjectId,
      // required: true,
      ref: "user",
    },
  },
  { timestamps: true }
);

categorySchema.post("init", (doc) => {
  doc.image = process.env.BASE_URL + "categories/" + doc.image;
  // doc.image = "http://localhost:3004/api/v1/categories/" + doc.image;
});

export const categoryModel = model("category", categorySchema);

// 	"http://localhost:3004/api/v1/categories0700a392-817e-4408-bee2-d3561df93427 - images.jpg"

// 	"http://localhost:3004/api/v1/category0700a392-817e-4408-bee2-d3561df93427 - images.jpg"
