const express = require("express");

const {
  getContactsController,
  getContactsByIdController,
  postContactController,
  deleteContactController,
  putContactController,
  patchContactController,
} = require("../controllers/contactsController");

const {
  contactBodyValidation,
  updateFavoriteValidation,
} = require("../middlewares/validationMiddleware");

const router = express.Router();

router.get("/", getContactsController);

router.get("/:contactId", getContactsByIdController);

router.post("/", contactBodyValidation, postContactController);

router.delete("/:contactId", deleteContactController);

router.put("/:contactId", contactBodyValidation, putContactController);

router.patch(
  "/:contactId/favorite",
  updateFavoriteValidation,
  patchContactController
);

module.exports = router;
