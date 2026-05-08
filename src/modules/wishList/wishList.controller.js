import { userModel } from "../../../databases/models/user.model.js";
import { AppError } from "../../utils/App.Error.js";
import { catchError } from "../../utils/catchError.js";

const addToWishList = catchError(async (req, res, next) => {
  let { product } = req.body;
  let results = await userModel.findOneAndUpdate(
    req.user._id,
    {
      $addToSet: { wishList: product },
    },
    { new: true }
  );
  !results && next(new AppError("not found Review", 404));
  results && res.json({ message: "success", results });
});

const removeFromWishList = catchError(async (req, res, next) => {
  let { product } = req.body;

  let results = await userModel.findOneAndUpdate(
    req.user._id,
    {
      $pull: { wishList: product },
    },
    { new: true }
  );
  
  !results && next(new AppError("not found Review", 404));
  results && res.json({ message: "success", results });
});

const getAllWishList = catchError(async (req, res, next) => {
  let results = await userModel.findOne({ _id: req.user._id });
  !results && next(new AppError("not found Review", 404));
  results && res.json({ message: "success", results: results.wishList });
});

export { addToWishList, removeFromWishList, getAllWishList };
