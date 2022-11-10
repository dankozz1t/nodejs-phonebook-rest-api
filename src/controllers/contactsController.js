const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateFavoriteById,
} = require("../services/contactsService");

const getContactsController = async (req, res) => {
  const contacts = await listContacts();

  res.json({ ...contacts });
};

const getContactsByIdController = async (req, res) => {
  const { contactId } = req.params;

  const contact = await getContactById(contactId);

  res.json({ ...contact });
};

const postContactController = async (req, res) => {
  const { body } = req;

  const contact = await addContact(body);

  res.json({ ...contact });
};

const deleteContactController = async (req, res) => {
  const { contactId } = req.params;

  const contact = await removeContact(contactId);

  res.json({ ...contact });
};

const putContactController = async (req, res) => {
  const { contactId } = req.params;
  const { body } = req;

  const contact = await updateContact(contactId, body);

  res.json({ ...contact });
};

const patchContactController = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  console.log("favorite: ", favorite);

  const contact = await updateFavoriteById(contactId, favorite);

  res.json({ ...contact });
};

module.exports = {
  getContactsController,
  getContactsByIdController,
  postContactController,
  deleteContactController,
  putContactController,
  patchContactController,
};
