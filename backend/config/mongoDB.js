const mongoose = require("mongoose");
const { MONGO_URI } = require("./env");

const connectDB = () => {
  try {
    mongoose.connect(MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error(
      `Error connecting to MongoDB: ${error.name}- ${error.message}`,
    );
  }
};

module.exports = connectDB;
