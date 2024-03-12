import express from "express";

import authController from "../controllers/authController.js";

import { userSignupSchema, userSigninSchema } from "../schemas/userSchema.js";

const authRouter = express.Router();

authRouter.post(
  "/signup",
  validateBody(userSignupSchema),
  authController.singup
);

export default authRouter;
