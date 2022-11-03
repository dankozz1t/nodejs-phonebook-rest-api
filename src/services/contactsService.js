const fs = require("fs").promises;
const path = require("path");
const { uid } = require("uid");

const contactsPath = path.resolve("src/db/contacts.json");

const listContacts = async () => {
  try {
    const response = await fs.readFile(contactsPath, "utf-8");

    return { status: "200", response: JSON.parse(response) };
  } catch (error) {
    return { status: "ERROR", response: error.message };
  }
};

const getContactById = async (contactId) => {
  try {
    const { response } = await listContacts();

    const contact = response.find((contact) => contact.id === contactId);

    if (!contact) {
      return { status: "404", response: "Not found" };
    }

    return { status: "200", response: { ...contact } };
  } catch (error) {
    return { status: "ERROR", response: error.message };
  }
};

const addContact = async ({ name, email, phone }) => {
  try {
    const { response } = await listContacts();

    const addedContact = { id: uid(), name, email, phone };

    response.push(addedContact);

    await fs.writeFile(contactsPath, JSON.stringify(response), "utf-8");

    return { status: "201", response: { ...addedContact } };
  } catch (error) {
    return { status: "ERROR", response: error.message };
  }
};

const removeContact = async (contactId) => {
  try {
    const { response } = await listContacts();

    const indexContact = response.findIndex(
      (contact) => contact.id === contactId
    );

    if (!response[indexContact]) {
      return { status: "404", response: "Not found" };
    }

    const newData = response.filter((contact) => contact.id !== contactId);

    await fs.writeFile(contactsPath, JSON.stringify(newData), "utf-8");

    return { status: "200", response: "contact deleted" };
  } catch (error) {
    return { status: "ERROR", response: error.message };
  }
};

const updateContact = async (contactId, body) => {
  try {
    const { response } = await listContacts();

    const indexContact = response.findIndex(
      (contact) => contact.id === contactId
    );

    if (!response[indexContact]) {
      return { status: "404", response: "Not found" };
    }

    response[indexContact] = { id: contactId, ...body };

    await fs.writeFile(contactsPath, JSON.stringify(response), "utf-8");

    return { status: "200", response: response[indexContact] };
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
};
