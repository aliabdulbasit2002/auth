const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      require: [true, "Please provide a name"],
    },
    email: {
      type: String,
      require: [true, "Please provide an email"],
      unique: [true, "Email already exist"],
    },
    password: {
      type: String,
      require: [true, "Please provide a password"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
