import Contact from "../models/Contact.js";

export const listContacts = () => Contact.find();

export const addContact = (data) => Contact.create(data);
