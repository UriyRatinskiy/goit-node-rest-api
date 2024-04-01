import express from "express";
import isValidId from "../middlevares/isValidId.js";
import aunthenticate from "../middlevares/aunthenticate.js";
import validateBody from "../decorators/validateBody.js";

import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
  patchFavorite,
} from "../controllers/contactsControllers.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";

const contactsRouter = express.Router();

contactsRouter.use(aunthenticate);

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", isValidId, getOneContact);

contactsRouter.delete("/:id", isValidId, deleteContact);

contactsRouter.post("/", validateBody(createContactSchema), createContact);

contactsRouter.put(
  "/:id",
  validateBody(updateContactSchema),
  isValidId,
  updateContact
);

contactsRouter.patch("/:id/favorite", isValidId, updateStatusContact);

contactsRouter.get("/favorite", patchFavorite);

export default contactsRouter;
