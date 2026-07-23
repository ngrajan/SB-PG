// here lives the application logic
const express = require("express");
const cors = require("cors");

const AppError = require("./utils/appError");
// routes import
const roomRoutes = require("./routes/roomRoutes");

const app = express();

// CORS middleware
app.use(cors({ origin: "*" }));

// json and HTML form parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/v1", roomRoutes);

app.all("{*splat}", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
