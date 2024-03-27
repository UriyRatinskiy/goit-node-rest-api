import fs from "fs/promises";
import path from "path";
// import cloudinary from "../helpers/cloudinary.js";

import * as contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import {
  createContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
} from "../schemas/contactsSchemas.js";
// import { request } from "express";

const postersPath = path.resolve("public", "posters");
console.log(postersPath);

export const getAllContacts = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;

    //   const result = await contactsService.listContacts({ owner });
    //   res.status(200).json(result);

    const result = await contactsService.listContacts({ owner });
    res.status(200).json(result);
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
  try {
    const { name, email, phone } = req.body;
    const { _id: owner } = req.user;

    const { error } = createContactSchema.validate({ name, email, phone });
    if (error) {
      throw HttpError(400, error.message);
    }

    console.log(req.body);
    console.log(req.file);

    const { path: oldPath, filename } = req.file;

    // const { url: poster } = await cloudinary.uploader.upload(req.file.path, {
    //   folder: "posters",
    // });
    // await fs.unlink(req.file.path);
    const newPath = path.join(postersPath, filename);
    await fs.rename(oldPath, newPath);
    const poster = path.join("public", "posters", filename);

    const result = await contactsService.addContact({
      name,
      email,
      phone,
      poster,
      owner,
    });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
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
