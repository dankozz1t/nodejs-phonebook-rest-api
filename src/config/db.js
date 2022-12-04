const pkg = require("mongoose");
const { connect, connection } = pkg;

require("dotenv").config();
require("../helpers");

const { MESSAGES } = require("../utils");
const { MONGO_URL } = process.env;

const db = connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection.on("connected", () =>
  console.log(`${MESSAGES.connected}`.brightBlue.bold)
);

connection.on("err", (err) =>
  console.log(`${MESSAGES.errMsg}: ${err.message}`.red.bold)
);

connection.on("disconnected", () =>
  console.log(`${MESSAGES.disconnected}`.brightBlue.bold)
);

process.on("SIGINT", async () => {
  connection.close();
  console.log(`${MESSAGES.closeConnection}`);
  process.exit(1);
});

module.exports = db;
