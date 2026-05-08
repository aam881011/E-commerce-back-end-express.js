import { AppError } from "../../utils/App.Error.js";
import { catchError } from "../../utils/catchError.js";
// import slugify from "slugify";
import { deleteOne } from "../handlers/factor.js";
import { userModel } from "./../../../databases/models/user.model.js";
import { ApiFeatures } from "./../../utils/ApiFeatures.js";

const addUser = catchError(async (req, res, next) => {
  // req.body.slug = slugify(req.body.name);
  // req.body.password = bcrypt.hashSync(req.body.password, 8);
  let user = await userModel.findOne({ email: req.body.email });
  if (user) return next(new AppError("duplicate email", 409));

  let results = new userModel(req.body);
  let added = await results.save();

  res.status(201).json({ message: "success", added });

  // const user = new userModel(req.body);
  // await user.save();
  // res.status(201).json({ message: "success", user });
});

const getAllUsers = catchError(async (req, res, next) => {
  // let users = await userModel.find();

  // res.status(201).json({ message: "success", brands });

  let apiFeatures = new ApiFeatures(userModel.find(), req.query)
    .paginate()
    .fields()
    .filter()
    .search()
    .sort();

  let users = await apiFeatures.mongooseQuery;
  res.status(201).json({ message: "success", users });
});

const getUserById = catchError(async (req, res, next) => {
  let { id } = req.params;
  let results = await userModel.findById(id);
  res.json({ message: "success", results });
});

const updateUser = catchError(async (req, res, next) => {
  // let categories = await categoryModel.find();
  const { id } = req.params;
  // const { name } = req.body;
  // req.body.slug = slugify(req.body.name);

  let user = await userModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  // res.status(201).json({ message: "success", category });
  !user && next(new AppError("category not found", 404));
  user && res.status(201).json({ message: "success", user });
});

const changeUserPassword = catchError(async (req, res, next) => {
  // let categories = await categoryModel.find();
  const { id } = req.params;
  req.body.passwordChangedAt = Date.now();
  // const { name } = req.body;

  // let user = await userModel.findByIdAndUpdate(
  //   id,
  //   { password: req.body.password },
  //   {
  //     new: true,
  //   }
  // );
  //-----------------------------
  let user = await userModel.findById(req.params.id);
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    let token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_KEY
    );

    await userModel.findByIdAndUpdate(
      id,
      {
        password: req.body.newPassword,
      },
      {
        new: true,
      }
    );

    return res.json({ message: "success", token });
  }
  next(new AppError("incorrect email or password", 401));
  //-----------------------------

  // res.status(201).json({ message: "success", category });
  // !user && next(new AppError("User not found", 404));
  // user && res.status(201).json({ message: "success", user });
});

const deleteUser = deleteOne(userModel);

export {
  addUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  changeUserPassword,
};
