import Contact from "../models/Contact.js";

export const listContacts = (filter = {}, query = {}) =>
  Contact.find(filter, undefined, query);

export const getContactById = (filter) => Contact.findOne(filter);

// export const getContactById = (_id) => Contact.findOne({ _id });

export const removeContact = (filter) => Contact.findOneAndDelete(filter);

export const addContact = (data) => {
  const { owner, ...contactData } = data;
  return Contact.create({ ...contactData, owner });
};

export const updateContact = (filter, data) =>
  Contact.findOneAndUpdate(filter, data);

export const updateStatusContact = (filter, data) =>
  Contact.findOneAndUpdate(filter, data, { new: true });
