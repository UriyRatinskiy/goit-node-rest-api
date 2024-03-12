import Joi from "joi";

// import { emailRegexp } from "../constans/user-constans";

export const userSignupSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  subscription: Joi.string().required(),
  token: Joi.string().required(),
});

export const userSigninSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  //   subscription: Joi.string().required(),
  //   token: Joi.string().required(),
});
