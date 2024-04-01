import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
  // owner: Joi.string().required(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3),
  email: Joi.string().email(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
  // owner: Joi.string(),
});

export const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
