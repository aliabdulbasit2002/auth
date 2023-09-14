const asyncHandler = require("express-async-handler");
const Contact = require("../model/contactModel");

//@desc Get all contacts
// @route Get /api/v1/contacts
// @access private
exports.getAllContacts = asyncHandler(async (req, res, next) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json({ message: "success", data: contacts });
});

//@desc Create a contact
// @route Post /api/v1/contacts
// @access private
exports.createContact = asyncHandler(async (req, res, next) => {
  const { name, email, phone } = req.body;
  if (!req.body) {
    return res
      .status(400)
      .json({ status: "fail", message: "All fields are required" });
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  res.status(201).json({ status: "success", data: contact });
});

//@desc Get a contact
// @route Get /api/v1/contacts/:id
// @access private
exports.getContact = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.json({ status: "success", data: contact });
});

//@desc Update a contact
// @route Get /api/v1/contacts/:id
// @access private
exports.updateContact = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have the permission to update other's contact");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json({ status: "success", message: updatedContact });
});

//@desc Delete a contact
// @route Get /api/v1/contacts/:id
// @access private
exports.deleteContact = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findByIdAndDelete(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have the permission to delete other's contact");
  }

  res.status(200).json({ status: "success", message: contact });
});
