const mongoose = require("mongoose");
const MediaSchema = require("./mediaModel");

const tenantSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  tenantImage: MediaSchema,
  addressProofType: {
    type: String,
    // enum: ["Aadhar", "Voter ID", "Passport", "Driving License"],
    required: true,
  },
  addressProofImage: MediaSchema,
  roomNumber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: true,
  },
  advancePaid: {
    type: String,
  },
  stayPeriod: {
    from: {
      type: Date,
      required: [true, "Start day of a stay period is required"],
    },
    to: {
      type: Date,
      required: [true, "End day of a stay period is required"],
    },
  },
});

tenantSchema.pre("validate", function () {
  if (this.stayPeriod && this.stayPeriod.from && this.stayPeriod.to) {
    if (this.stayPeriod.to <= this.stayPeriod.from) {
      this.invalidate(
        "stayPeriod.to",
        "End day of a stay period must be after the start day",
      );
    }
  }
});

module.exports = mongoose.model("Tenant", tenantSchema);
