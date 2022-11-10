const { Contact } = require("../models/contacts");

const listContacts = async () => {
  try {
    const response = await Contact.find({});

    return { status: "200", response };
  } catch (error) {
    return { status: "ERROR", response: error.message };
  }
};

const getContactById = async (contactId) => {
  try {
    const response = await Contact.findById(contactId);
    if (!response) {
      return { status: "404", response: "Not found" };
    }
    return { status: "200", response };
  } catch (error) {
    return { status: "ERROR", response: error.message };
  }
};

const addContact = async ({ name, email, phone }) => {
  try {
    const response = await Contact.create({ name, email, phone });

    return { status: "201", response };
  } catch (error) {
    return { status: "ERROR", response: error.message };
  }
};

const removeContact = async (contactId) => {
  try {
    const response = await Contact.findByIdAndDelete(contactId);

    if (!response) {
      return { status: "404", response: "Not found" };
    }
    return { status: "200", response };
  } catch (error) {
    return { status: "ERROR", response: error.message };
  }
};

const updateContact = async (contactId, body) => {
  try {
    const response = await Contact.findByIdAndUpdate(contactId, body, {
      new: true,
    });

    if (!response) {
      return { status: "404", response: "Not found" };
    }

    return { status: "200", response };
  } catch (error) {
    return { status: "ERROR", response: error.message };
  }
};

const updateFavoriteById = async (contactId, favorite) => {
  try {
    const response = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true }
    );

    if (!response) {
      return { status: "404", response: "Not found" };
    }

    return { status: "200", response };
  } catch (error) {
    return { status: "ERROR", response: error.message };
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateFavoriteById,
};
