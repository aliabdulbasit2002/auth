const {
  createContact,
  deleteContact,
  getAllContacts,
  getContact,
  updateContact,
} = require("../controllers/contactController");
const { validateToken } = require("../middleware/validateTokenHandler");
const express = require("express");

const router = express.Router();

router.use(validateToken);
router.route("/").get(getAllContacts).post(createContact);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;
