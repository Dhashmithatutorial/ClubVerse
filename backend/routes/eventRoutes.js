
const express = require("express");
const Event = require("../models/Event");

const router = express.Router();

// GET all events
router.get("/", async (req, res) => {
  try {
    res.json(await Event.find().sort({ name: 1 }));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET one event
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE event
router.post("/", async (req, res) => {
  try {
    res.status(201).json(await Event.create(req.body));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE event
router.put("/:id", async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE event
router.delete("/:id", async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json({ message: "Event deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
