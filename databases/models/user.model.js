import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "user name required"],
      minLength: [1, "too short user name"],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: [true, "email required"],
      minLength: 1,
      unique: [true, "email must be unique"],
    },
    password: {
      type: String,
      required: true,
      minLength: [6, "minLength 6 characters"],
    },
    phone: {
      type: String,
      required: [true, "phone number required"],
    },
    profilePic: String,
    passwordChangedAt: Date,
    rol: {
      type: String,
      enum: ["admin", "user"],
      // default: "user"
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    blocked: {
      type: Boolean,
      default: false,
    },
    confirmEmail: {
      type: Boolean,
      default: false
    },
    wishList: [
      {
        type: Schema.ObjectId,
        ref: "product",
      },
    ],
    address: [
      {
        city: String,
        street: String,
        phone: String,
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", function () {
  if (this.password) this.password = bcrypt.hashSync(this.password, 8);
});

userSchema.pre("findOneAndUpdate", function () {
  if (this._update.password)
    this._update.password = bcrypt.hashSync(this._update.password, 8);
});

export const userModel = model("user", userSchema);
