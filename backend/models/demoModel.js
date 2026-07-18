const mongoose = require("mongoose");

const demoSchema = new mongoose.Schema({
  name: String,
});

module.exports = mongoose.model("Demo", demoSchema);
