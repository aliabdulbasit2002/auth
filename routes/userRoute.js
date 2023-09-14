const express = require("express");
const {
  login,
  activeUser,
  register,
} = require("../controllers/userController");
const { validateToken } = require("../middleware/validateTokenHandler");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/active", validateToken, activeUser);

module.exports = router;
