
const mongoose = require("mongoose");

const membershipSchema = new mongoose.Schema(
  {
    club: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
      required: true,
    },
    name: { type: String, required: true },
    uid: { type: String, required: true },
    email: { type: String, required: true },
    dept: { type: String, required: true },
    year: { type: String },
  },
  { timestamps: true }
);

membershipSchema.index({ club: 1, uid: 1 }, { unique: true });

module.exports = mongoose.model("Membership", membershipSchema);
