
const express = require("express");
const User = require("../models/User");

const router = express.Router();

// CREATE user
router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET user by university ID
router.get("/:universityId", async (req, res) => {
  try {
    const user = await User.findOne({
      universityId: req.params.universityId,
    });

    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// JOIN CLUB
router.post("/:universityId/join/:clubId", async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { universityId: req.params.universityId },
      { $addToSet: { joinedClubs: req.params.clubId } },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// FAVORITE CLUB
router.post("/:universityId/favorite/:clubId", async (req, res) => {
  try {
    const user = await User.findOne({ universityId: req.params.universityId });
    if (!user) return res.status(404).json({ message: "User not found" });

    const id = req.params.clubId;
    const exists = user.favoriteClubs.includes(id);

    if (exists) user.favoriteClubs.pull(id);
    else user.favoriteClubs.addToSet(id);

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// REGISTER EVENT
router.post("/:universityId/register/:eventId", async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { universityId: req.params.universityId },
      { $addToSet: { registeredEvents: req.params.eventId } },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
