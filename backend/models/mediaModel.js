const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["image", "video"],
      required: true,
    },
    filename: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

module.exports = mediaSchema;
