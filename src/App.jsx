
import { useEffect, useMemo, useState } from "react";
import "./App.css";

const API = "http://localhost:5000/api";

const COLORS = {
  "Performing Arts": "#a06cf0",
  "Visual Arts & Crafts": "#ff6fa5",
  "Literature & Media": "#4db8ff",
  Inclusive: "#3ecf8e",
};

const CLUBS_FALLBACK = [
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
].map(([name, category, emoji, members, description]) => ({
  id: name.toLowerCase().replace(/[^a-z]+/g, "-").replace(/-$/, ""),
  name,
  category,
  emoji,
  members,
  description,
  color: COLORS[category],
  tagline: `${name}: where campus comes together.`,
  about: `The ${name} club is a student-led community open to everyone, whether you're a beginner or experienced. (Demo content.)`,
  activities: [
    "Weekly meetups",
    "Skill workshops",
    "Collaborative projects",
    "Showcase events",
  ],
  achievements: [
    "Best Newcomer Club 2025 (demo)",
    "500+ participants engaged (demo)",
    "Inter-university feature (demo)",
  ],
  why: [
    "Meet like-minded people",
    "Grow new skills",
    "Build your portfolio",
  ],
}));


const EVENTS_FALLBACK = [
  ["e1", "Club Induction Fair", "Cultural", "culture-heritage", "Oct 10, 2026", "10:00 AM", "Meet every club and sign up for what excites you.", "🎪"],
  ["e2", "Dance Showcase", "Performance", "dance", "Oct 18, 2026", "6:00 PM", "An evening of solo and group performances.", "💃"],
  ["e3", "Open Mic Night", "Performance", "music", "Oct 22, 2026", "7:30 PM", "Sing, play or recite. The stage is yours.", "🎤"],
  ["e4", "Photography Walk", "Creative", "photography", "Oct 25, 2026", "4:00 PM", "Capture golden hour with fellow shutterbugs.", "📸"],
  ["e5", "Inter-Club Quiz", "Literary", "quiz", "Nov 2, 2026", "3:00 PM", "Teams battle it out across every topic.", "🧩"],
  ["e6", "Cultural Showcase", "Cultural", "culture-heritage", "Nov 8, 2026", "5:00 PM", "Food, music and traditions from across campus.", "🏛️"],
  ["e7", "Creative Arts Workshop", "Creative", "arts-crafts", "Nov 12, 2026", "2:00 PM", "Hands-on session in mixed-media art.", "🎨"],
  ["e8", "Music Night", "Performance", "music", "Nov 20, 2026", "7:00 PM", "Live bands and acoustic sets.", "🎵"],
].map(([id, name, type, club, date, time, description, emoji]) => ({
  id,
  name,
  type,
  club,
  date,
  time,
  description,
  emoji,
}));


const GALLERY_CATEGORIES = {
  Dance: { emoji: "💃", color: "#a06cf0" },
  Music: { emoji: "🎵", color: "#ffc933" },
  Arts: { emoji: "🎨", color: "#ff6fa5" },
  Events: { emoji: "🎪", color: "#4db8ff" },
  "Campus Life": { emoji: "🏫", color: "#3ecf8e" },
};


const GALLERY = [
  { i: 1, cat: "Dance", e: "💃", alt: "Dance Performance", src: "/gallery/dance-1.jpg", h: 280, c: "#b58cf4" },
  { i: 2, cat: "Dance", e: "🩰", alt: "Dance Practice", src: "/gallery/dance-2.jpg", h: 365, c: "#b58cf4" },
  { i: 3, cat: "Dance", e: "🎭", alt: "Cultural Dance", src: "/gallery/dance-3.jpg", h: 300, c: "#b58cf4" },

  { i: 4, cat: "Music", e: "🎵", alt: "Music Performance", src: "/gallery/music-1.jpg", h: 470, c: "#ffd166" },
  { i: 5, cat: "Music", e: "🎸", alt: "Music Practice", src: "/gallery/music-2.jpg", h: 320, c: "#ffd166" },
  { i: 6, cat: "Music", e: "🎹", alt: "Musical Moments", src: "/gallery/music-3.jpg", h: 280, c: "#ffd166" },

  { i: 7, cat: "Arts", e: "🎨", alt: "Arts and Crafts", src: "/gallery/arts-1.jpg", h: 320, c: "#ff77aa" },
  { i: 8, cat: "Arts", e: "🖌️", alt: "Creative Workshop", src: "/gallery/arts-2.jpg", h: 280, c: "#ff77aa" },
  { i: 9, cat: "Arts", e: "🖼️", alt: "Art Exhibition", src: "/gallery/arts-3.jpg", h: 365, c: "#ff77aa" },

  { i: 10, cat: "Events", e: "🎉", alt: "College Event", src: "/gallery/events-1.jpg", h: 365, c: "#55baff" },
  { i: 11, cat: "Events", e: "🎊", alt: "College Celebration", src: "/gallery/events-2.jpg", h: 300, c: "#55baff" },
  { i: 12, cat: "Events", e: "🏆", alt: "Event Highlights", src: "/gallery/events-3.jpg", h: 320, c: "#55baff" },

  { i: 13, cat: "Campus Life", e: "🏫", alt: "Campus Moments", src: "/gallery/campus-life-1.jpg", h: 300, c: "#55baff" },
  { i: 14, cat: "Campus Life", e: "📚", alt: "Student Activities", src: "/gallery/campus-life-2.jpg", h: 365, c: "#55baff" },
  { i: 15, cat: "Campus Life", e: "🌟", alt: "College Memories", src: "/gallery/campus-life-3.jpg", h: 280, c: "#55baff" },
  { i: 16, cat: "Campus Life", e: "🌈", alt: "Student Life", src: "/gallery/life-3.jpg", h: 320, c: "#55baff" },
];



const HOME_STATS = [
  ["15+", "Clubs"],
  ["04", "Categories"],
  ["30+", "Events"],
  ["800+", "Students"],
];

const BENEFITS = [
  ["🤝", "Meet People", "Find friends beyond your classroom."],
  ["🧠", "Learn New Skills", "Pick up crafts, tools and talents."],
  ["🎤", "Express Yourself", "Perform, write, create, speak."],
  ["🚀", "Build Your Journey", "Grow a story worth telling."],
];

const ABOUT = [
  ["Our Purpose", "ClubVerse is a frontend concept that helps university students discover clubs, events and student communities."],
  ["Why Clubs Matter", "Clubs build friendships, skills and a sense of belonging outside lectures."],
  ["How It Works", "Browse clubs, save favourites, join with a quick form, and register for events."],
  ["Student Community", "Built for students who want to find their people and try something new."],
];


const read = (key, def) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? def;
  } catch {
    return def;
  }
};

const save = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

/* ================================
   MAIN APP COMPONENT
================================ */

function App() {
  /* ---------- Main Data States ---------- */

  const [clubs, setClubs] = useState(CLUBS_FALLBACK);
  const [events, setEvents] = useState(EVENTS_FALLBACK);

  /* ---------- User Data States ---------- */

  const [favs, setFavs] = useState(() => read("cv-favs", []));
  const [joined, setJoined] = useState(() => read("cv-joined", []));
  const [regs, setRegs] = useState(() => read("cv-regs", []));
  const [activity, setActivity] = useState(() => read("cv-act", []));

  /* ---------- Theme State ---------- */

  const [theme, setTheme] = useState(() => read("cv-theme", "light"));

  /* ---------- Navigation & UI States ---------- */

  const [route, setRoute] = useState(location.hash.slice(1) || "/");
  const [modal, setModal] = useState(null);
  const [mobile, setMobile] = useState(false);

  /* ---------- Filter States ---------- */

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [eventType, setEventType] = useState("All");
  const [galleryCat, setGalleryCat] = useState("All");

  /* ================================
     THEME EFFECT
  ================================ */

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    save("cv-theme", theme);
  }, [theme]);

  /* ================================
     LOCAL STORAGE EFFECTS
  ================================ */

  useEffect(() => {
    save("cv-favs", favs);
  }, [favs]);

  useEffect(() => {
    save("cv-joined", joined);
  }, [joined]);

  useEffect(() => {
    save("cv-regs", regs);
  }, [regs]);

  useEffect(() => {
    save("cv-act", activity);
  }, [activity]);

  /* ================================
     ROUTING EFFECT
  ================================ */

  useEffect(() => {
    const handleRoute = () => {
      setRoute(location.hash.slice(1) || "/");
    };

    window.addEventListener("hashchange", handleRoute);

    return () => window.removeEventListener("hashchange", handleRoute);
  }, []);

  /* ================================
     FETCH CLUBS & EVENTS
  ================================ */

  useEffect(() => {
    fetch(`${API}/clubs`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length) {
          setClubs(
            data.map((club) => ({
              ...club,
              color: club.color || COLORS[club.category],
              emoji: club.emoji || "✨",
            }))
          );
        }
      })
      .catch(() => {});

    fetch(`${API}/events`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length) {
          setEvents(data);
        }
      })
      .catch(() => {});
  }, []);

  /* ================================
     ROUTE & DATA HELPERS
  ================================ */

  const path = route.split("/").filter(Boolean);
  const page = path[0] || "home";
  const clubId = path[1];

  const clubById = (id) =>
    clubs.find((c) => String(c._id || c.id) === String(id));

  const getEvent = (id) =>
    events.find((e) => String(e._id || e.id) === String(id));

  const log = (text) => setActivity((a) => [text, ...a].slice(0, 6));

  /* ================================
     FAVORITE CLUB HANDLER
  ================================ */

  const toggleFav = (id) => {
    setFavs((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  /* ================================
     NAVIGATION HANDLER
  ================================ */

  const go = (hash) => {
    location.hash = hash;
    setMobile(false);
  };

  const favoriteCount = favs.length;

  /* ================================
     REUSABLE COMPONENTS
  ================================ */

  const FilterBar = ({ items, value, onChange }) => (
    <div className="filters">
      {items.map((x) => (
        <button
          key={x}
          className={x === value ? "on" : ""}
          onClick={() => onChange(x)}
        >
          {x}
        </button>
      ))}
    </div>
  );

  /* ---------- Club Card ---------- */

  const ClubCard = ({ c }) => (
    <article
      className="card club"
      style={{ "--accent": c.color || COLORS[c.category] }}
    >
      <div className="club-img">
        <span>{c.emoji}</span>
      </div>

      <div className="club-body">
        <small className="cat">{c.category}</small>
        <h3>{c.name}</h3>
        <p>{c.description}</p>

        <div className="meta">{c.members || 0}+ Members</div>

        <div className="row">
          <button
            className={`heart ${favs.includes(c.id || c._id) ? "on" : ""}`}
            onClick={() => toggleFav(c.id || c._id)}
            aria-label="Save club"
          >
            {favs.includes(c.id || c._id) ? "♥" : "♡"}
          </button>

          <a className="explore" href={`#/clubs/${c.id || c._id}`}>
            Explore <i>→</i>
          </a>
        </div>
      </div>
    </article>
  );

  /* ---------- Event Card ---------- */

  const EventCard = ({ e }) => {
    const c = clubById(e.club) || clubs[0];
    const id = e.id || e._id;

    return (
      <article
        className="card event"
        style={{ "--accent": c?.color || COLORS[c?.category] }}
      >
        <div className="club-img short">
          <span>{e.emoji || "🎉"}</span>
        </div>

        <div className="club-body">
          <small className="cat">{e.type} · {c?.name || "Club"}</small>
          <h3>{e.name}</h3>
          <div className="meta">{e.date} · {e.time}</div>
          <p>{e.description}</p>

          <button
            className="btn sm"
            disabled={regs.includes(id)}
            onClick={() => setModal({ kind: "event", item: e })}
          >
            {regs.includes(id) ? "✓ Registered" : "Register"}
          </button>
        </div>
      </article>
    );
  };

  /* ---------- Statistics Box ---------- */

  const statBox = ([n, l]) => (
    <div key={l}>
      <b>{n}</b>
      <span>{l}</span>
    </div>
  );

  /* ================================
     FORM FIELDS
  ================================ */

  const formFields =
    modal?.kind === "join"
      ? [
          ["name", "Full Name", "text"],
          ["uid", "University ID", "text"],
          ["email", "Email", "email"],
          ["dept", "Department", "text"],
          ["year", "Year", "select"],
        ]
      : [
          ["name", "Name", "text"],
          ["uid", "University ID", "text"],
          ["email", "Email", "email"],
          ["dept", "Department", "text"],
        ];

  /* ================================
     FORM SUBMISSION HANDLER
  ================================ */

  const submitForm = async (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));
    const item = modal.item;
    const id = item.id || item._id;

    try {
      const endpoint =
        modal.kind === "join"
          ? `${API}/clubs/${id}/join`
          : `${API}/events/${id}/register`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Something went wrong");
        return;
      }

      if (modal.kind === "join") {
        setJoined((a) => (a.includes(id) ? a : [...a, id]));
        log(`Joined the ${item.name} club`);
      } else {
        setRegs((a) => (a.includes(id) ? a : [...a, id]));
        log(`Registered for ${item.name}`);
      }

      setModal({
        kind: "success",
        message:
          modal.kind === "join"
            ? "🎉 Welcome to the club!"
            : "🎉 You're registered!",
      });
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Unable to connect to the server. Please try again.");
    }
  };

  /* ================================
     HOME PAGE
  ================================ */

  const home = (
    <>
      <section className="hero">
        <span className="blob b1"></span>
        <span className="blob b2"></span>
        <span className="blob b3"></span>

        <div className="hero-txt">
          <h1>
            Find Your People.
            <br />
            Find Your Passion.
          </h1>

          <p>
            Discover clubs, communities and experiences that make university
            life more than classrooms.
          </p>

          <div className="row g">
            <a href="#/clubs" className="btn">Explore Clubs</a>
            <a href="#/events" className="btn ghost">View Events</a>
          </div>
        </div>

        <div className="hero-viz">
          {[
            ["💃", "Dance", "#a06cf0"],
            ["🎵", "Music", "#ffc933"],
            ["📸", "Photography", "#4db8ff"],
            ["🎭", "Theatre", "#ff6fa5"],
            ["✍", "Writers", "#3ecf8e"],
          ].map(([emoji, name, color], i) => (
            <div
              className="fcard"
              key={name}
              style={{ "--c": color, "--i": i }}
            >
              <span>{emoji}</span>
              {name}
            </div>
          ))}
        </div>
      </section>

      <section className="stats">
        {HOME_STATS.map(statBox)}
      </section>

      <section className="sec">
        <h2>Find Your Community</h2>
        <p className="sub">Whatever you're into, there's a space for you.</p>

        <div className="grid">
          {clubs.slice(0, 6).map((c) => (
            <ClubCard key={c.id || c._id} c={c} />
          ))}
        </div>

        <div className="center">
          <a href="#/clubs" className="btn">See all clubs</a>
        </div>
      </section>

      <section className="sec">
        <h2>More Than Just a Club</h2>

        <div className="grid four">
          {BENEFITS.map(([icon, title, text]) => (
            <div className="card why" key={title}>
              <span>{icon}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );

  /* ================================
     PAGE CONTENT & ROUTING
  ================================ */

  let content = home;

  /* ---------- Explore Clubs Page ---------- */

  if (page === "clubs") {
    const list = clubs.filter(
      (c) =>
        (category === "All" || c.category === category) &&
        `${c.name} ${c.category} ${c.description}`
          .toLowerCase()
          .includes(query.toLowerCase())
    );

    content = (
      <section className="sec">
        <h2>Find Your Community</h2>
        <p className="sub">Whatever you're into, there's a space for you.</p>

        <input
          className="search"
          placeholder="Search clubs or interests..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <FilterBar
          items={["All", ...Object.keys(COLORS)]}
          value={category}
          onChange={setCategory}
        />

        <div className="grid">
          {list.length ? (
            list.map((c) => <ClubCard key={c.id || c._id} c={c} />)
          ) : (
            <div className="empty">
              <h3>No clubs found</h3>
              <p>Try another search or category.</p>
            </div>
          )}
        </div>
      </section>
    );
  }

  /* ---------- Club Details Page ---------- */

  if (page === "clubs" && clubId) {
    const c = clubById(clubId);

    content = !c ? (
      <div className="empty">
        <h3>Club not found</h3>
        <a href="#/clubs">Back to clubs</a>
      </div>
    ) : (
      <div style={{ "--accent": c.color || COLORS[c.category] }}>
        <div className="banner">
          <span>{c.emoji}</span>

          <div>
            <small>{c.category}</small>
            <h1>{c.name}</h1>
            <p>{c.tagline || `${c.name}: where campus comes together.`}</p>
          </div>
        </div>

        <div className="detail">
          <div className="row g">
            <button
              className="btn ghost"
              onClick={() => toggleFav(c.id || c._id)}
            >
              {favs.includes(c.id || c._id)
                ? "♥ Saved"
                : "♡ Add to My Clubs"}
            </button>

            <button
              className="btn"
              disabled={joined.includes(c.id || c._id)}
              onClick={() => setModal({ kind: "join", item: c })}
            >
              {joined.includes(c.id || c._id) ? "✓ Joined" : "Join Club"}
            </button>
          </div>

          <h2>About the club</h2>
          <p>{c.about || c.description}</p>

          <h2>What We Do</h2>
          <ul className="chips">
            {(c.activities || []).map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>

          <h2>Upcoming Events</h2>
          {events
            .filter(
              (e) =>
                String(e.club) === String(c.id || c._id) ||
                String(e.club) === String(c.id)
            )
            .map((e) => (
              <p key={e.id || e._id}>
                <b>{e.name}</b> · {e.date}, {e.time}
              </p>
            ))}

          <h2>Achievements</h2>
          <ul>
            {(c.achievements || []).map((a) => (
              <li key={a}>🏆 {a}</li>
            ))}
          </ul>

          <h2>Why Join?</h2>
          <ul>
            {(c.why || []).map((a) => (
              <li key={a}>✨ {a}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  /* ---------- Events Page ---------- */

  if (page === "events") {
    content = (
      <section className="sec">
        <h2>What’s Happening on Campus?</h2>
        <p className="sub">Demo events. Dates are fictional.</p>

        <FilterBar
          items={["All", "Cultural", "Creative", "Performance", "Literary"]}
          value={eventType}
          onChange={setEventType}
        />

        <div className="grid">
          {events
            .filter((e) => eventType === "All" || e.type === eventType)
            .map((e) => (
              <EventCard key={e.id || e._id} e={e} />
            ))}
        </div>
      </section>
    );
  }

  /* ---------- Gallery Page ---------- */

  if (page === "gallery") {
    content = (
      <section className="sec">
        <h2>Moments from Campus</h2>
        <p className="sub">Placeholder visuals.</p>

        <FilterBar
          items={["All", ...Object.keys(GALLERY_CATEGORIES)]}
          value={galleryCat}
          onChange={setGalleryCat}
        />

        <div className="masonry">
          {GALLERY
            .filter((g) => galleryCat === "All" || g.cat === galleryCat)
            .map((g) => (
              <button
                className="tile has-img"
                key={g.i}
                style={{ height: g.h, "--c": g.c }}
                onClick={() => setModal({ kind: "photo", photo: g })}
              >
                <img
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.remove();
                    e.currentTarget.parentElement.classList.remove("has-img");
                  }}
                />
                <span>{g.e}</span>
                <small>{g.cat}</small>
              </button>
            ))}
        </div>
      </section>
    );
  }

  /* ---------- My Space Page ---------- */

  if (page === "my-space") {
    const picks = (ids) =>
      clubs.filter((c) => ids.includes(c.id || c._id));

    const hour = new Date().getHours();

    content = (
      <section className="sec">
        <h2>My Space</h2>

        <p className="sub">
          Good {hour < 12 ? "morning" : hour < 17 ? "afternoon" : "evening"},
          Student 👋
        </p>

        <div className="stats mini">
          {[
            [joined.length, "Clubs Joined"],
            [favs.length, "Saved Clubs"],
            [regs.length, "Events Registered"],
          ].map(statBox)}
        </div>

        <h3>Saved Clubs</h3>

        {favs.length ? (
          <div className="grid">
            {picks(favs).map((c) => (
              <ClubCard key={c.id || c._id} c={c} />
            ))}
          </div>
        ) : (
          <p>
            No saved clubs yet. <a href="#/clubs">Browse clubs</a>
          </p>
        )}

        <h3>Joined Clubs</h3>

        {joined.length ? (
          <ul className="chips">
            {picks(joined).map((c) => (
              <li key={c.id || c._id}>
                {c.emoji} {c.name}
              </li>
            ))}
          </ul>
        ) : (
          <p>You haven't joined any clubs yet.</p>
        )}

        <h3>Registered Events</h3>

        {regs.length ? (
          events
            .filter((e) => regs.includes(e.id || e._id))
            .map((e) => (
              <p key={e.id || e._id}>
                {e.emoji} <b>{e.name}</b> · {e.date}
              </p>
            ))
        ) : (
          <p>No registrations yet.</p>
        )}

        <h3>Recent Activity</h3>

        {activity.length ? (
          <ul>
            {activity.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        ) : (
          <p>Nothing yet.</p>
        )}

        <h3>Recommended Clubs</h3>

        <div className="grid">
          {clubs
            .filter(
              (c) =>
                !favs.includes(c.id || c._id) &&
                !joined.includes(c.id || c._id)
            )
            .slice(0, 3)
            .map((c) => (
              <ClubCard key={c.id || c._id} c={c} />
            ))}
        </div>
      </section>
    );
  }

  /* ---------- About Page ---------- */

  if (page === "about") {
    content = (
      <section className="sec">
        <h2>About ClubVerse</h2>

        <div className="grid">
          {ABOUT.map(([title, text]) => (
            <div className="card why" key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>

        <p className="sub center">
          ClubVerse is a training project and is not an official university
          website.
        </p>
      </section>
    );
  }

  /* ================================
     MAIN RETURN & NAVIGATION
  ================================ */

  return (
    <>
      <header className="nav" id="nav">
        <div className="nav-in">
          <a href="#/" className="logo">✦ CLUBVERSE</a>

          <nav className={`links ${mobile ? "open" : ""}`} id="links">
            <a className={page === "home" ? "active" : ""} href="#/">Home</a>
            <a className={page === "clubs" ? "active" : ""} href="#/clubs">Explore Clubs</a>
            <a className={page === "events" ? "active" : ""} href="#/events">Events</a>
            <a className={page === "gallery" ? "active" : ""} href="#/gallery">Gallery</a>
            <a className={page === "about" ? "active" : ""} href="#/about">About</a>
          </nav>

          <div className="nav-r">
            <a className="icon" href="#/clubs" aria-label="Search">🔍</a>

            <a className="icon" href="#/my-space" aria-label="My Clubs">
              ♡
              {favoriteCount > 0 && <b className="dot">{favoriteCount}</b>}
            </a>

            <button
              className="icon"
              onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
              aria-label="Toggle theme"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>

            <a href="#/clubs" className="btn sm hide-m">Explore Clubs</a>

            <button
              className="icon burger"
              onClick={() => setMobile((m) => !m)}
              aria-label="Menu"
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      <main id="app" className="page">
        {content}
      </main>

      <footer className="footer">
        <b>✦ CLUBVERSE</b> Discover. Connect. Create.
        <br />
        <small>A frontend concept project. Not an official university website.</small>
      </footer>

      {/* ---------- MODAL ---------- */}

      {modal && (
        <div
          className="overlay"
          onClick={(e) => e.target === e.currentTarget && setModal(null)}
        >
          <div className={`modal ${modal.kind === "photo" ? "lightbox-modal" : ""}`}>
            <button
              className="x"
              onClick={() => setModal(null)}
              aria-label="Close"
            >
              ✕
            </button>

            {/* Photo Modal */}

            {modal.kind === "photo" ? (
              <div
                className="tile lightbox has-img"
                style={{ "--c": modal.photo.c }}
              >
                <img src={modal.photo.src} alt={modal.photo.alt} />
                <span>{modal.photo.e}</span>
                <small>{modal.photo.cat}</small>
              </div>

            /* Success Modal */

            ) : modal.kind === "success" ? (
              <div className="ok">
                <h2>{modal.message}</h2>
                <button className="btn" onClick={() => setModal(null)}>
                  Done
                </button>
              </div>

            /* Join Club / Register Event Modal */

            ) : (
              <form noValidate onSubmit={submitForm}>
                <h2>
                  {modal.kind === "join"
                    ? `Join ${modal.item.name}`
                    : `Register: ${modal.item.name}`}
                </h2>

                {formFields.map(([key, label, type]) => (
                  <label key={key}>
                    {label}

                    {type === "select" ? (
                      <select name={key} required>
                        <option value="">Select</option>
                        {["1st", "2nd", "3rd", "4th"].map((y) => (
                          <option key={y}>{y} year</option>
                        ))}
                      </select>
                    ) : (
                      <input name={key} type={type} required />
                    )}

                    <em></em>
                  </label>
                ))}

                <button className="btn" type="submit">
                  {modal.kind === "join"
                    ? "Join Club"
                    : "Confirm Registration"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
