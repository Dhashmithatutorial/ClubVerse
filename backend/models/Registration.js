
const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    name: { type: String, required: true },
    uid: { type: String, required: true },
    email: { type: String, required: true },
    dept: { type: String, required: true },
  },
  { timestamps: true }
);

registrationSchema.index({ event: 1, uid: 1 }, { unique: true });

module.exports = mongoose.model("Registration", registrationSchema);
