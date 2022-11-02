const express = require("express");

const {
  getContactsController,
  getContactsByIdController,
  postContactController,
  deleteContactController,
  putContactController,
} = require("../controllers/contactsController");

const {
  contactBodyValidation,
} = require("../middlewares/validationMiddleware");

const router = express.Router();

router.get("/", getContactsController);

router.get("/:contactId", getContactsByIdController);

router.post("/", contactBodyValidation, postContactController);

router.delete("/:contactId", deleteContactController);

router.put("/:contactId", contactBodyValidation, putContactController);

module.exports = router;
