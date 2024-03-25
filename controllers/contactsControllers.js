import * as contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import {
  createContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
} from "../schemas/contactsSchemas.js";
// import { request } from "express";

export const getAllContacts = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    console.log(req.body);
    console.log(req.file);

    //   const result = await contactsService.listContacts({ owner });
    //   res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// export const add = async (req, res) => {
//   const { _id: owner } = req.user;
//   const result = await contactsService.addContact({ ...req.body, owner });
//   res.status(201).json(result);
// };

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: owner } = req.user;
    const result = await contactsService.getContactById({ _id: id, owner });
    if (!result) {
      throw HttpError(404, `Not found`);
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: owner } = req.user;
    const result = await contactsService.removeContact({ _id: id, owner });
    if (!result) {
      throw HttpError(404, `Not found`);
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { error } = createContactSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const result = await contactsService.addContact({ ...req.body, owner });
  res.status(201).json(result);
};

export const updateContact = async (req, res, next) => {
  try {
    const { error } = updateContactSchema.validate(req.body);
    const newData = req.body;
    if (!Object.keys(newData).length) {
      throw HttpError(400, "Body must have at least one field");
    }
    if (error) {
      throw HttpError(400, error.message);
    }
    const { id } = req.params;
    const { _id: owner } = req.user;

    const result = await contactsService.updateContact(
      { _id: id, owner },
      req.body
    );
    if (!result) {
      throw HttpError(404, `Not found`);
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const patchFavorite = async (req, res, next) => {
  try {
    const { error } = updateFavoriteSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const id = req.params.id;
    const { favorite } = req.body;
    const { _id: owner } = req.user;

    const result = await contactsService.updateStatusContact(
      { _id: id, owner },
      { favorite },
      { returnDocument: "after" }
    );
    if (!result) {
      throw HttpError(404, `Not found`);
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
