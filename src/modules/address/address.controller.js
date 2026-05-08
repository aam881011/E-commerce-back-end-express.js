import { userModel } from "../../../databases/models/user.model.js";
import { AppError } from "../../utils/App.Error.js";
import { catchError } from "../../utils/catchError.js";

const addAddress = catchError(async (req, res, next) => {
  // let { product } = req.body;
  let results = await userModel.findOneAndUpdate(
    req.user._id,
    {
      $addToSet: { address: req.body },
    },
    { new: true }
  );
  !results && next(new AppError("not found Review", 401));
  results && res.json({ message: "success", results });
});

const removeAddress = catchError(async (req, res, next) => {
  let results = await userModel.findOneAndUpdate(
    req.user._id,
    {
      $pull: { address: { _id: req.body.address } },
    },
    { new: true }
  );
  !results && next(new AppError("not found Review", 401));
  results && res.json({ message: "success", results: results.address });
});

const getAllAddress = catchError(async (req, res, next) => {
  let results = await userModel.findOne({ _id: req.user._id });
  !results && next(new AppError("not found Review", 404));
  results && res.json({ message: "Done", results: results.address });
});

export { addAddress, removeAddress, getAllAddress };
