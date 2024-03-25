import express from "express";
import isValidId from "../middlevares/isValidId.js";
import aunthenticate from "../middlevares/aunthenticate.js";
import upload from "../middlevares/upload.js";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  patchFavorite,
} from "../controllers/contactsControllers.js";

const contactsRouter = express.Router();

contactsRouter.use(aunthenticate);

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", isValidId, getOneContact);

contactsRouter.delete("/:id", isValidId, deleteContact);

contactsRouter.post("/", upload.single("poster"), createContact);

contactsRouter.put("/:id", isValidId, updateContact);

contactsRouter.patch("/:id/favorite", isValidId, patchFavorite);

export default contactsRouter;
