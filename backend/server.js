
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Membership = require("./models/Membership");
const Registration = require("./models/Registration");

const clubRoutes = require("./routes/clubRoutes");
const eventRoutes = require("./routes/eventRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Basic API
app.get("/", (req, res) => {
  res.json({ message: "ClubVerse API is running 🚀" });
});

// Existing routes
app.use("/api/clubs", clubRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/users", userRoutes);

// JOIN CLUB
app.post("/api/clubs/:id/join", async (req, res) => {
  try {
    console.log("JOIN CLUB REQUEST:", req.params.id, req.body);

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid club ID. Club must exist in MongoDB."
      });
    }

    const membership = await Membership.create({
      club: req.params.id,
      name: req.body.name,
      uid: req.body.uid,
      email: req.body.email,
      dept: req.body.dept,
      year: req.body.year
    });

    console.log("MEMBERSHIP SAVED:", membership._id);

    res.status(201).json({
      message: "Successfully joined club",
      membership
    });

  } catch (error) {
    console.error("JOIN CLUB ERROR:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        message: "You have already joined this club"
      });
    }

    res.status(400).json({
      message: error.message
    });
  }
});

// REGISTER EVENT
app.post("/api/events/:id/register", async (req, res) => {
  try {
    console.log("EVENT REGISTRATION REQUEST:", req.params.id, req.body);

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid event ID. Event must exist in MongoDB."
      });
    }

    const registration = await Registration.create({
      event: req.params.id,
      name: req.body.name,
      uid: req.body.uid,
      email: req.body.email,
      dept: req.body.dept
    });

    console.log("REGISTRATION SAVED:", registration._id);

    res.status(201).json({
      message: "Successfully registered for event",
      registration
    });

  } catch (error) {
    console.error("EVENT REGISTRATION ERROR:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        message: "You have already registered for this event"
      });
    }

    res.status(400).json({
      message: error.message
    });
  }
});

// GET ALL MEMBERSHIPS
app.get("/api/memberships", async (req, res) => {
  try {
    const memberships = await Membership.find()
      .populate("club")
      .sort({ createdAt: -1 });

    res.json(memberships);
  } catch (error) {
    console.error("GET MEMBERSHIPS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

// GET ALL EVENT REGISTRATIONS
app.get("/api/registrations", async (req, res) => {
  try {
    const registrations = await Registration.find()
      .populate("event")
      .sort({ createdAt: -1 });

    res.json(registrations);
  } catch (error) {
    console.error("GET REGISTRATIONS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

// Start server after MongoDB connects
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`ClubVerse backend running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });
