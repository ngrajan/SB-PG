const app = require("./app");
const connectDB = require("./config/mongoDB");
const { PORT } = require("./config/env");

process.on("uncaughtException", (err) => {
  console.error(err);
  console.error(err.stack);
  console.error(`Uncaught Exception: ${err.name} - ${err.message}`);
  process.exit(1);
});

connectDB();
const server = app.listen(PORT, () =>
  console.log("App listening to port:", PORT),
);

process.on("unhandledRejection", (err) => {
  console.error(`Unhandled Rejection: ${err.name} - ${err.message}`);
  server.close(() => process.exit(1));
});
