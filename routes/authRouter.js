import express from "express";

import authController from "../controllers/authController.js";

import validateBody from "../decorators/validateBody.js";

import aunthenticate from "../middlevares/aunthenticate.js";

import {
  userSignupSchema,
  userSigninSchema,
  userEmailSchema,
} from "../schemas/userSchemas.js";

import upload from "../middlevares/upload.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  upload.single("avatar"),
  validateBody(userSignupSchema),
  authController.register
);

authRouter.get("/verify/:verificationToken", authController.verify);

authRouter.post(
  "/verify",
  validateBody(userEmailSchema),
  authController.resendVerifyEmail
);

authRouter.post("/login", validateBody(userSigninSchema), authController.login);

authRouter.post("/logout", aunthenticate, authController.logoutUser);

authRouter.get("/current", aunthenticate, authController.getCurrentUser);

authRouter.patch("/subscription", aunthenticate, authController.updateStatus);

authRouter.patch(
  "/avatars",
  aunthenticate,
  upload.single("avatar"),
  authController.updateAvatar
);

export default authRouter;
