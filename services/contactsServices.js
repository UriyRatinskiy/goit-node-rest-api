import Contact from "../models/Contact.js";

export const listContacts = (filter = {}) => Contact.find(filter);

export const getContactById = (id) => Contact.findById(id);
// export const getContactById = (_id) => Contact.findOne({ _id });

export const removeContact = (id) => Contact.findByIdAndDelete(id);

export const addContact = (data) => Contact.create(data);

export const updateContact = (id, data) => Contact.findByIdAndUpdate(id, data);

export const updateStatusContact = (id, data) =>
  Contact.findByIdAndUpdate(id, data, { new: true });
