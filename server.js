const app = require("./app");
const mongoose = require("mongoose");

require("dotenv").config();

const { MONGO_URL, PORT = 8081 } = process.env;

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}!  💨💨💨`);
    });
  })
  .catch((err) => {
    console.log(`Error with connect to database: ${err.message}`);
    process.exit(1);
  });
