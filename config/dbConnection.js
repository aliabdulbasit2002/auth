const mongoose = require("mongoose");
const { errorHandler } = require("../middleware/errorhandler");

exports.connectionDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MANGODB_URI);
    console.log("Db connected...");
  } catch (error) {
    console.log("DB not connected", errorHandler);
    process.exit(1);
  }
};
