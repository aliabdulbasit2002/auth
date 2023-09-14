const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

//@desc Register user
// @route Get /api/v1/users
// @access public
exports.register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // check if email exist
  const existEmail = await User.findOne({ email });
  if (existEmail) {
    res.status(400);
    throw new Error("user already exist");
  }

  // //   hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({ username, email, password: hashedPassword });
  if (user) {
    return res.status(201).json({ message: "success", data: user });
  } else {
    return res.status(400).json({ message: "user data is invalid" });
  }
});

//@desc login user
// @route Get /api/v1/users
// @access public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const user = await User.findOne({ email });
  // compare hashed-password with password
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});

//@desc active user
// @route Get /api/v1/users
// @access private
exports.activeUser = asyncHandler(async (req, res, next) => {
  res.status(200).json(req.user);
});
