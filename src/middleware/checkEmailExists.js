import { userModel } from "../../databases/models/user.model.js";
import { AppError } from "../utils/App.Error.js";

export const checkEmailExists = async (req, res, next) => {
  let user = await userModel.findOne({ email: req.body.email });
  if (user) return next(new AppError("account is already exists", 409));

  next();
};
