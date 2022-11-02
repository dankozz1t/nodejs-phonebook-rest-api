const app = require("./app");

const PORT = process.env.PORT || 8081;

const start = async () => {
  try {
    app.listen(PORT, (err) => {
      if (err) console.error("Error at aserver launch:", err);
      console.log(`Server running. Use our API on port: ${PORT}!  💨💨💨`);
    });
  } catch (err) {
    console.error(`Failed to launch application with error: ${err.message}`);
  }
};

start();
