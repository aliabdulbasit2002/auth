const express = require("express");
const morgan = require("morgan");

// route paths
const contactRoute = require("./routes/contactRoute");
const userRoute = require("./routes/userRoute");

// Error handler
const { errorHandler } = require("./middleware/errorhandler");

const app = express();

// middleware
app.use(express.json());
app.use(errorHandler);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use((req, res, next) => {
  console.log("Hello from the middleware !!!");
  next();
});

// Routes
app.use("/api/v1/contacts", contactRoute);
app.use("/api/v1/users", userRoute);

module.exports = app;
