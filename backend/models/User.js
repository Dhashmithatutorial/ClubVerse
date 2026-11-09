
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    universityId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    department: String,
    year: String,
    joinedClubs: [String],
    favoriteClubs: [String],
    registeredEvents: [String],
    activity: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
