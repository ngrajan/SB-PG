const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    roomNumber: {
      type: String,
      required: true,
      unique: true,
    },
    roomMedia: [{ type: String, required: true }],
    share: {
      type: Number,
      min: [1, "Share must be atleast 1"],
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// calculates the vacancies virtually
roomSchema.virtual("vacancies").get(function () {
  return this.share - this.tenants.length;
});

roomSchema.path("tenants").validate(function (tenants) {
  return tenants.length <= this.share;
}, "Number of tenants cannot exceed the share capacity");

// pre-computing the vacancies before saving the room document
// roomSchema.pre("save", function (next) {
//   this.vacancies = this.share - this.tenants.length;
//   next();
// });

module.exports = mongoose.model("Room", roomSchema);
