// import { AppError } from "../../utils/App.Error.js";
import { catchError } from "../../utils/catchError.js";
// import slugify from "slugify";
// import { brandModel } from './../../../databases/models/brand.model.js';
// import { deleteOne } from "../handlers/factor.js";
import { userModel } from "../../../databases/models/user.model.js";
import { AppError } from "../../utils/App.Error.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUp = catchError(async (req, res, next) => {
  // req.body.slug = slugify(req.body.name);
  // const {  email  } = req.body;

  const isUser = await userModel.findOne({ email: req.body.email });
  if (isUser) return next(new AppError("account is already exists", 409));

  const user = new userModel(req.body);

  await user.save();
  let token = jwt.sign(
    { email: user.email, name: user.name, id: user._id, role: user.role },
    "mySecretAzhry"
  );

  res.status(201).json({ message: "success", token });
});

export const signIn = catchError(async (req, res, next) => {
  // let { email, password } = req.body;
  // let user = await userModel.findOne({ email });

  // if (!user || !bcrypt.compare(password, user.password))
  //   return next(new AppError("user not found or password in correct", 401));

  // let token = jwt.sign(
  //   { email: user.email, name: user.name, id: user._id, role: user.role },
  //   "mySecretAzhry"
  // );
  // res.status(201).json({ message: "success", token });

  let { email, password } = req.body;
  let isFound = await userModel.findOne({ email });

  const match = await bcrypt.compare(password, isFound.password);

  if (isFound && match) {
    let token = jwt.sign(
      { name: isFound.name, userId: isFound._id, role: isFound.role },
      "mySecretAzhry"
    );
    return res.json({ message: "success", token });
  }

  next(new AppError("incorrect email or password", 401));
});

export const protectedRoutes = catchError(async (req, res, next) => {
  let { token } = req.headers;
  if (!token) return next(new AppError("token not provided", 401));

  // let decodedToken = await jwt.verify(token, "mySecretAzhry");

  let decodedToken = await jwt.verify(
    token,
    "mySecretAzhry",
    async (err, decoded) => {
      if (err) return next(new AppError("Invalid Token", err));
    }
  );

  let user = await userModel.findById(decodedToken.userId);
  if (!user) return next(new AppError("invalid token", 401));

  if (user.passwordChangedAt) {
    let changePasswordDate = parseInt(user.passwordChangedAt.getTime() / 1000);
    if (changePasswordDate > decodedToken.iat)
      return next(new AppError("invalid token", 401));
  }

  req.user = user;
  next();
});

export const allowedTo = (...roles) => {
  return catchError(async (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(
        new AppError(
          "you are not authorized to access this route you are" + req.user.role,
          401
        )
      );
    next();
  });
};

// export { signUp, signIn, protectedRoutes, allowedTo };
