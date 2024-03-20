import Contact from "../models/Contact.js";

export const listContacts = (filter = {}, query = {}) =>
  Contact.find(filter, undefined, query);

export const getContactById = (filter) => Contact.findById(filter);

// export const getContactById = (_id) => Contact.findOne({ _id });

export const removeContact = (filter) => Contact.findByIdAndDelete(filter);

export const addContact = (data) => Contact.create(data);

export const updateContact = (filter, data) =>
  Contact.findByIdAndUpdate(filter, data);

export const updateStatusContact = (id, data) =>
  Contact.findByIdAndUpdate(id, data, { new: true });
