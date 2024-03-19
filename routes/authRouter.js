import express from "express";

import authController from "../controllers/authController.js";

import validateBody from "../decorators/validateBody.js";
import aunthenticate from "../middlevares/aunthenticate.js";

import { userSignupSchema, userSigninSchema } from "../schemas/userSchemas.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(userSignupSchema),
  authController.register
);
authRouter.post("/login", validateBody(userSigninSchema), authController.login);

authRouter.post("/logout", aunthenticate, authController.logoutUser);

authRouter.get("/current", aunthenticate, authController.getCurrentUser);

export default authRouter;
