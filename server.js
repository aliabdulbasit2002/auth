const dotenv = require("dotenv");
const { connectionDB } = require("./config/dbConnection");

dotenv.config({ path: "./.env" });
const app = require("./app");

// connect to database
connectionDB();

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
