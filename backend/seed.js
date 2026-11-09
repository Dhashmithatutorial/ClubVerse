
require("dotenv").config();
const mongoose = require("mongoose");
const Club = require("./models/Club");
const Event = require("./models/Event");

const colors = {
  "Performing Arts": "#a06cf0",
  "Visual Arts & Crafts": "#ff6fa5",
  "Literature & Media": "#4db8ff",
  Inclusive: "#3ecf8e",
};

const clubRows = [
  ["Dance", "Performing Arts", "💃", 120, "Express yourself through movement, performance and creativity."],
  ["Music", "Performing Arts", "🎵", 140, "Jam sessions, bands and open stages for every kind of sound."],
  ["Theatre Arts", "Performing Arts", "🎭", 90, "Act, direct and build the stage stories of campus."],
  ["Fashion", "Performing Arts", "👗", 75, "Style, design and runway shows led by students."],
  ["Arts & Crafts", "Visual Arts & Crafts", "🎨", 85, "Paint, sketch and make things with your hands."],
  ["Readers", "Literature & Media", "📚", 70, "Book circles and reading challenges for curious minds."],
  ["Writers", "Literature & Media", "✍️", 65, "Workshops for poetry, stories and everything in between."],
  ["Orators", "Literature & Media", "🎤", 80, "Debate, speak and find your voice."],
  ["Photography", "Literature & Media", "📸", 110, "Photo walks, editing sessions and exhibitions."],
  ["Film", "Literature & Media", "🎬", 95, "Screenings, scripts and short-film making."],
  ["Language", "Literature & Media", "🗣️", 60, "Practice new languages with friendly peers."],
  ["Quiz", "Literature & Media", "🧩", 100, "Trivia nights and inter-club quiz battles."],
  ["Culture & Heritage", "Inclusive", "🏛️", 88, "Celebrate traditions, festivals and shared stories."],
  ["Gender Champions", "Inclusive", "🌈", 72, "Advocacy and dialogue for an equal campus."],
  ["Mental Health & Wellbeing", "Inclusive", "💚", 105, "Peer support, mindfulness and wellbeing events."],
];

const clubs = clubRows.map(([name, category, emoji, members, description]) => ({
  name,
  slug: name.toLowerCase().replace(/[^a-z]+/g, "-").replace(/-$/, ""),
  category,
  emoji,
  members,
  description,
  color: colors[category],
  tagline: `${name}: where campus comes together.`,
  about: `The ${name} club is a student-led community open to everyone, whether you're a beginner or experienced. (Demo content.)`,
  activities: ["Weekly meetups", "Skill workshops", "Collaborative projects", "Showcase events"],
  achievements: ["Best Newcomer Club 2025 (demo)", "500+ participants engaged (demo)", "Inter-university feature (demo)"],
  why: ["Meet like-minded people", "Grow new skills", "Build your portfolio"],
}));

const eventRows = [
  ["e1", "Club Induction Fair", "Cultural", "culture-heritage", "Oct 10, 2026", "10:00 AM", "Meet every club and sign up for what excites you.", "🎪"],
  ["e2", "Dance Showcase", "Performance", "dance", "Oct 18, 2026", "6:00 PM", "An evening of solo and group performances.", "💃"],
  ["e3", "Open Mic Night", "Performance", "music", "Oct 22, 2026", "7:30 PM", "Sing, play or recite. The stage is yours.", "🎤"],
  ["e4", "Photography Walk", "Creative", "photography", "Oct 25, 2026", "4:00 PM", "Capture golden hour with fellow shutterbugs.", "📸"],
  ["e5", "Inter-Club Quiz", "Literary", "quiz", "Nov 2, 2026", "3:00 PM", "Teams battle it out across every topic.", "🧩"],
  ["e6", "Cultural Showcase", "Cultural", "culture-heritage", "Nov 8, 2026", "5:00 PM", "Food, music and traditions from across campus.", "🏛️"],
  ["e7", "Creative Arts Workshop", "Creative", "arts-crafts", "Nov 12, 2026", "2:00 PM", "Hands-on session in mixed-media art.", "🎨"],
  ["e8", "Music Night", "Performance", "music", "Nov 20, 2026", "7:00 PM", "Live bands and acoustic sets.", "🎵"],
];

const events = eventRows.map(([eventId, name, type, club, date, time, description, emoji]) => ({
  eventId, name, type, club, date, time, description, emoji,
}));

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Club.deleteMany({});
    await Event.deleteMany({});

    await Club.insertMany(clubs);
    await Event.insertMany(events);

    console.log("15 clubs and 8 events added successfully!");
  } catch (error) {
    console.error(error);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
