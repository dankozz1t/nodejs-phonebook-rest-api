const app = require("./app");
const db = require("./src/config");

require("./src/helpers");

const { PORT } = process.env || 8081;

db.then(() => {
  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}!  💨💨💨`);
  });
}).catch((err) => {
  console.log(`Error with connect to database: ${err.message}`);
});
