import { AppError } from "../../utils/App.Error.js";
import { catchError } from "../../utils/catchError.js";

export const deleteOne = (model, name) => {
  return catchError(async (req, res, next) => {
    const { id } = req.params;
    const document = await model.findByIdAndDelete(id);

    let response = {};
    response[name] = document;
    !document && next(new AppError(`${name} not found`, 404));
    document && res.status(201).json({ message: "success", ...response });
  });
};
