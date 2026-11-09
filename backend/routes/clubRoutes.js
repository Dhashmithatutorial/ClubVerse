
const express = require("express");
const Club = require("../models/Club");

const router = express.Router();

// GET all clubs
router.get("/", async (req, res) => {
  try {
    const clubs = await Club.find().sort({ name: 1 });
    res.json(clubs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET one club
router.get("/:id", async (req, res) => {
  try {
    const club = await Club.findOne({ slug: req.params.id });

    if (!club) {
      return res.status(404).json({ message: "Club not found" });
    }

    res.json(club);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE club
router.post("/", async (req, res) => {
  try {
    const club = await Club.create(req.body);
    res.status(201).json(club);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE club
router.put("/:id", async (req, res) => {
  try {
    const club = await Club.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!club) return res.status(404).json({ message: "Club not found" });
    res.json(club);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE club
router.delete("/:id", async (req, res) => {
  try {
    const club = await Club.findByIdAndDelete(req.params.id);
    if (!club) return res.status(404).json({ message: "Club not found" });
    res.json({ message: "Club deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
