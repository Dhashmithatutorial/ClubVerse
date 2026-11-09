
const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    club: { type: String, required: true },
    date: String,
    time: String,
    description: String,
    emoji: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
