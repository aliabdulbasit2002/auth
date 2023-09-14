const mongoose = require("mongoose");

const { Schema } = mongoose;

const contactSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      require: [true, "Please provide a name"],
    },
    email: {
      type: String,
      require: [true, "Please provide an email"],
      unique: true,
    },
    phone: {
      type: String,
      require: [true, "Please provide a contact number"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);
