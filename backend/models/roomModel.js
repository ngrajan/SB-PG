const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    roomNumber: {
      type: String,
      required: true,
      unique: true,
    },
    share: {
      type: Number,
      min: [2, "Share must be at least 2"],
      max: [4, "Share cannot exceed 4"],
      required: true,
    },
    tenants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tenant",
      },
    ],
    price: {
      type: Number,
      min: [0, "Price must be a positive number"],
      max: [10000, "Price cannot exceed 10000"],
      required: true,
    },
    vacancies: {
      type: Number,
      min: [0, "Vacancies must be a positive number"],
    },
  },

  //   {
  //     toJSON: { virtuals: true },
  //     toObject: { virtuals: true },
  //   },
);

// calculates the vacancies virtually
// roomSchema.virtual("vacancies").get(function () {
//   return (this.share || 0) - (this.tenants ? this.tenants.length : 0);
// });

// pre-computing the vacancies before saving the room document
roomSchema.pre("save", function () {
  if (this.vacancies === undefined || this.vacancies === null) {
    this.vacancies = (this.share || 0) - (this.tenants ? this.tenants.length : 0);
  }
  // next();
});

module.exports = mongoose.model("Room", roomSchema);
