import express from "express";
import * as user from "./user.controller.js";

const userRouter = express.Router();
// User
userRouter
  .route("/")
  .post(user.addUser)
  .get(user.getAllUsers);

  userRouter
  .route("/:id")
  .put(user.updateUser)
  .get(user.getUserById)
  .patch(user.changeUserPassword)
  .delete(user.deleteUser);

export default userRouter;

