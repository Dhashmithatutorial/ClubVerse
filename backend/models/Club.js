
const mongoose = require("mongoose");

const clubSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    emoji: { type: String, default: "🎓" },
    members: { type: Number, default: 0 },
    description: String,
    color: String,
    tagline: String,
    about: String,
    activities: [String],
    achievements: [String],
    why: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Club", clubSchema);
