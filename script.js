'use strict';

/* =============================================================
   1. CONFIG
   ============================================================= */
const STORAGE_KEYS = {
  theme: 'cv-theme',
  favs: 'cv-favs',
  joined: 'cv-joined',
  regs: 'cv-regs',
  act: 'cv-act',
};

const CLUB_COLORS = {
  'Performing Arts': '#a06cf0',
  'Visual Arts & Crafts': '#ff6fa5',
  'Literature & Media': '#4db8ff',
  Inclusive: '#3ecf8e',
};
const CLUB_CATEGORIES = Object.keys(CLUB_COLORS);
const EVENT_TYPES = ['Cultural', 'Creative', 'Performance', 'Literary'];
const YEAR_OPTIONS = ['1st', '2nd', '3rd', '4th'];
const MAX_ACTIVITY_ITEMS = 6;

/* =============================================================
   2. DATA
   ============================================================= */

/* ---------- Clubs ----------
   Each row: [name, category, emoji, members, description] */
const CLUB_ROWS = [
  ['Dance', 'Performing Arts', '💃', 120, 'Express yourself through movement, performance and creativity.'],
  ['Music', 'Performing Arts', '🎵', 140, 'Jam sessions, bands and open stages for every kind of sound.'],
  ['Theatre Arts', 'Performing Arts', '🎭', 90, 'Act, direct and build the stage stories of campus.'],
  ['Fashion', 'Performing Arts', '👗', 75, 'Style, design and runway shows led by students.'],
  ['Arts & Crafts', 'Visual Arts & Crafts', '🎨', 85, 'Paint, sketch and make things with your hands.'],
  ['Readers', 'Literature & Media', '📚', 70, 'Book circles and reading challenges for curious minds.'],
  ['Writers', 'Literature & Media', '✍️', 65, 'Workshops for poetry, stories and everything in between.'],
  ['Orators', 'Literature & Media', '🎤', 80, 'Debate, speak and find your voice.'],
  ['Photography', 'Literature & Media', '📸', 110, 'Photo walks, editing sessions and exhibitions.'],
  ['Film', 'Literature & Media', '🎬', 95, 'Screenings, scripts and short-film making.'],
  ['Language', 'Literature & Media', '🗣️', 60, 'Practice new languages with friendly peers.'],
  ['Quiz', 'Literature & Media', '🧩', 100, 'Trivia nights and inter-club quiz battles.'],
  ['Culture & Heritage', 'Inclusive', '🏛️', 88, 'Celebrate traditions, festivals and shared stories.'],
  ['Gender Champions', 'Inclusive', '🌈', 72, 'Advocacy and dialogue for an equal campus.'],
  ['Mental Health & Wellbeing', 'Inclusive', '💚', 105, 'Peer support, mindfulness and wellbeing events.'],
];

const clubs = CLUB_ROWS.map(([name, category, emoji, members, description]) => ({
  id: name.toLowerCase().replace(/[^a-z]+/g, '-').replace(/-$/, ''),
  name,
  category,
  emoji,
  members,
  description,
  color: CLUB_COLORS[category],
  tagline: `${name}: where campus comes together.`,
  about: `The ${name} club is a student-led community open to everyone, whether you're a beginner or experienced. (Demo content.)`,
  activities: ['Weekly meetups', 'Skill workshops', 'Collaborative projects', 'Showcase events'],
  achievements: ['Best Newcomer Club 2025 (demo)', '500+ participants engaged (demo)', 'Inter-university feature (demo)'],
  why: ['Meet like-minded people', 'Grow new skills', 'Build your portfolio'],
}));

/* ---------- Events ----------
   Each row: [id, name, type, clubId, date, time, description, emoji] */
const EVENT_ROWS = [
  ['e1', 'Club Induction Fair', 'Cultural', 'culture-heritage', 'Oct 10, 2026', '10:00 AM', 'Meet every club and sign up for what excites you.', '🎪'],
  ['e2', 'Dance Showcase', 'Performance', 'dance', 'Oct 18, 2026', '6:00 PM', 'An evening of solo and group performances.', '💃'],
  ['e3', 'Open Mic Night', 'Performance', 'music', 'Oct 22, 2026', '7:30 PM', 'Sing, play or recite. The stage is yours.', '🎤'],
  ['e4', 'Photography Walk', 'Creative', 'photography', 'Oct 25, 2026', '4:00 PM', 'Capture golden hour with fellow shutterbugs.', '📸'],
  ['e5', 'Inter-Club Quiz', 'Literary', 'quiz', 'Nov 2, 2026', '3:00 PM', 'Teams battle it out across every topic.', '🧩'],
  ['e6', 'Cultural Showcase', 'Cultural', 'culture-heritage', 'Nov 8, 2026', '5:00 PM', 'Food, music and traditions from across campus.', '🏛️'],
  ['e7', 'Creative Arts Workshop', 'Creative', 'arts-crafts', 'Nov 12, 2026', '2:00 PM', 'Hands-on session in mixed-media art.', '🎨'],
  ['e8', 'Music Night', 'Performance', 'music', 'Nov 20, 2026', '7:00 PM', 'Live bands and acoustic sets.', '🎵'],
];

const events = EVENT_ROWS.map(([id, name, type, club, date, time, description, emoji]) => ({
  id, name, type, club, date, time, description, emoji,
}));

/* ---------- Gallery ----------
   HOW TO ADD YOUR OWN PHOTOS:
   Change any "src" below. Use a local file (images/dance-1.jpg)
   or a full web link (https://example.com/photo.jpg).
   If a file is missing or broken, the emoji placeholder shows instead. */
const GALLERY_CATEGORIES = {
  Dance:         { emoji: '💃', color: '#a06cf0' },
  Music:         { emoji: '🎵', color: '#ffc933' },
  Arts:          { emoji: '🎨', color: '#ff6fa5' },
  Events:        { emoji: '🎪', color: '#4db8ff' },
  'Campus Life': { emoji: '🏫', color: '#3ecf8e' },
};
const GALLERY_CATS = Object.keys(GALLERY_CATEGORIES);
const GALLERY_HEIGHTS = [180, 240, 300]; // repeats to create the staggered masonry look

const GALLERY_PHOTOS = [
  { cat: 'Dance',       src: 'images/dance-1.jpg' },
  { cat: 'Music',       src: 'images/music-1.jpg' },
  { cat: 'Arts',        src: 'images/arts-1.jpg' },
  { cat: 'Events',      src: 'images/events-1.jpg' },
  { cat: 'Campus Life', src: 'images/campus-life-1.jpg' },

  { cat: 'Dance',       src: 'images/dance-2.jpg' },
  { cat: 'Music',       src: 'images/music-2.jpg' },
  { cat: 'Arts',        src: 'images/arts-2.jpg' },
  { cat: 'Events',      src: 'images/events-2.jpg' },
  { cat: 'Campus Life', src: 'images/campus-life-2.jpg' },

  { cat: 'Dance',       src: 'images/dance-3.jpg' },
  { cat: 'Music',       src: 'images/music-3.jpg' },
  { cat: 'Arts',        src: 'images/arts-3.jpg' },
  { cat: 'Events',      src: 'images/events-3.jpg' },
  { cat: 'Campus Life', src: 'images/campus-life-3.jpg' },
];

const gallery = GALLERY_PHOTOS.map(({ cat, src }, i) => ({
  cat,
  src,
  e: GALLERY_CATEGORIES[cat].emoji,
  c: GALLERY_CATEGORIES[cat].color,
  h: GALLERY_HEIGHTS[i % GALLERY_HEIGHTS.length],
  alt: `${cat} moment on campus`,
}));

/* =============================================================
   3. STATE (saved in localStorage)
   ============================================================= */
const loadSaved = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
};

const state = {
  theme: loadSaved(STORAGE_KEYS.theme, 'light'),
  favs: loadSaved(STORAGE_KEYS.favs, []),
  joined: loadSaved(STORAGE_KEYS.joined, []),
  regs: loadSaved(STORAGE_KEYS.regs, []),
  act: loadSaved(STORAGE_KEYS.act, []),
};

const persist = () => {
  Object.entries(STORAGE_KEYS).forEach(([prop, key]) => {
    localStorage.setItem(key, JSON.stringify(state[prop]));
  });
};

const logActivity = (text) => {
  state.act = [text, ...state.act].slice(0, MAX_ACTIVITY_ITEMS);
};

/* =============================================================
   4. HELPERS
   ============================================================= */
const $ = (selector, root = document) => root.querySelector(selector);
const app = $('#app');

const getClub = (id) => clubs.find((c) => c.id === id);
const getEvent = (id) => events.find((e) => e.id === id);
const isFav = (id) => state.favs.includes(id);
const isJoined = (id) => state.joined.includes(id);
const isRegistered = (id) => state.regs.includes(id);

const greeting = () => {
  const hour = new Date().getHours();
  return hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening';
};

/* =============================================================
   5. COMPONENTS (reusable HTML)
   ============================================================= */
const filterBar = (list, active, attr) => `
  <div class="filters">
    ${list.map((x) => `<button class="${x === active ? 'on' : ''}" data-${attr}="${x}">${x}</button>`).join('')}
  </div>`;

const clubCard = (c) => `
  <article class="card club" style="--accent:${c.color}">
    <div class="club-img"><span>${c.emoji}</span></div>
    <div class="club-body">
      <small class="cat">${c.category}</small>
      <h3>${c.name}</h3>
      <p>${c.description}</p>
      <div class="meta">${c.members}+ Members</div>
      <div class="row">
        <button class="heart ${isFav(c.id) ? 'on' : ''}" data-fav="${c.id}" aria-label="Save club">${isFav(c.id) ? '♥' : '♡'}</button>
        <a class="explore" href="#/clubs/${c.id}">Explore <i>→</i></a>
      </div>
    </div>
  </article>`;

const eventCard = (e) => {
  const club = getClub(e.club);
  const done = isRegistered(e.id);
  return `
  <article class="card event" style="--accent:${club.color}">
    <div class="club-img short"><span>${e.emoji}</span></div>
    <div class="club-body">
      <small class="cat">${e.type} · ${club.name}</small>
      <h3>${e.name}</h3>
      <div class="meta">${e.date} · ${e.time}</div>
      <p>${e.description}</p>
      <button class="btn sm" data-reg="${e.id}" ${done ? 'disabled' : ''}>${done ? '✓ Registered' : 'Register'}</button>
    </div>
  </article>`;
};

/* Photo markup: if the image fails to load, it removes itself
   and the emoji placeholder shows instead. */
const galleryPhoto = (g) =>
  `<img src="${g.src}" alt="${g.alt}" loading="lazy" onerror="this.parentElement.classList.remove('has-img');this.remove()">`;

const galleryTile = (g) => `
  <button class="tile has-img" data-tile="${g.i}" aria-label="Open ${g.cat} photo" style="height:${g.h}px;--c:${g.c}">
    ${galleryPhoto(g)}<span>${g.e}</span><small>${g.cat}</small>
  </button>`;

const statBox = ([number, label]) => `<div><b>${number}</b><span>${label}</span></div>`;
const infoCard = ([icon, title, text]) => `<div class="card why"><span>${icon}</span><h3>${title}</h3><p>${text}</p></div>`;

/* =============================================================
   6. PAGES (each returns HTML)
   ============================================================= */
const HERO_CARDS = [
  ['💃', 'Dance', '#a06cf0'],
  ['🎵', 'Music', '#ffc933'],
  ['📸', 'Photography', '#4db8ff'],
  ['🎭', 'Theatre', '#ff6fa5'],
  ['✍', 'Writers', '#3ecf8e'],
];
const HOME_STATS = [['15+', 'Clubs'], ['04', 'Categories'], ['30+', 'Events'], ['800+', 'Students']];
const HOME_BENEFITS = [
  ['🤝', 'Meet People', 'Find friends beyond your classroom.'],
  ['🧠', 'Learn New Skills', 'Pick up crafts, tools and talents.'],
  ['🎤', 'Express Yourself', 'Perform, write, create, speak.'],
  ['🚀', 'Build Your Journey', 'Grow a story worth telling.'],
];
const ABOUT_CARDS = [
  ['Our Purpose', 'ClubVerse is a frontend concept that helps university students discover clubs, events and student communities.'],
  ['Why Clubs Matter', 'Clubs build friendships, skills and a sense of belonging outside lectures.'],
  ['How It Works', 'Browse clubs, save favourites, join with a quick form, and register for events. Everything is stored in your browser.'],
  ['Student Community', 'Built for students who want to find their people and try something new.'],
];

const pages = {
  home: () => `
    <section class="hero">
      <span class="blob b1"></span><span class="blob b2"></span><span class="blob b3"></span>
      <div class="hero-txt">
        <h1>Find Your People.<br>Find Your Passion.</h1>
        <p>Discover clubs, communities and experiences that make university life more than classrooms.</p>
        <div class="row g">
          <a href="#/clubs" class="btn">Explore Clubs</a>
          <a href="#/events" class="btn ghost">View Events</a>
        </div>
      </div>
      <div class="hero-viz">
        ${HERO_CARDS.map(([emoji, name, color], i) => `<div class="fcard" style="--c:${color};--i:${i}"><span>${emoji}</span>${name}</div>`).join('')}
      </div>
    </section>

    <section class="stats">${HOME_STATS.map(statBox).join('')}</section>

    <section class="sec">
      <h2>Find Your Community</h2>
      <p class="sub">Whatever you're into, there's a space for you.</p>
      <div class="grid">${clubs.slice(0, 6).map(clubCard).join('')}</div>
      <div class="center"><a href="#/clubs" class="btn">See all clubs</a></div>
    </section>

    <section class="sec">
      <h2>More Than Just a Club</h2>
      <div class="grid four">${HOME_BENEFITS.map(infoCard).join('')}</div>
    </section>`,

  clubs: () => `
    <section class="sec">
      <h2>Find Your Community</h2>
      <p class="sub">Whatever you're into, there's a space for you.</p>
      <input class="search" id="q" placeholder="Search clubs or interests..." autocomplete="off" />
      <div id="filter-wrap"></div>
      <div id="club-grid"></div>
    </section>`,

  detail: (id) => {
    const c = getClub(id);
    if (!c) return `<div class="empty"><h3>Club not found</h3><a href="#/clubs">Back to clubs</a></div>`;

    const clubEvents = events.filter((e) => e.club === id);
    const fav = isFav(id);
    const joined = isJoined(id);

    return `
    <div style="--accent:${c.color}">
      <div class="banner">
        <span>${c.emoji}</span>
        <div><small>${c.category}</small><h1>${c.name}</h1><p>${c.tagline}</p></div>
      </div>
      <div class="detail">
        <div class="row g">
          <button class="btn ghost" data-fav="${id}" data-label="1">${fav ? '♥ Saved' : '♡ Add to My Clubs'}</button>
          <button class="btn" data-join="${id}" ${joined ? 'disabled' : ''}>${joined ? '✓ Joined' : 'Join Club'}</button>
        </div>
        <h2>About the club</h2><p>${c.about}</p>
        <h2>What We Do</h2><ul class="chips">${c.activities.map((a) => `<li>${a}</li>`).join('')}</ul>
        <h2>Upcoming Events</h2>
        ${clubEvents.length
          ? clubEvents.map((e) => `<p><b>${e.name}</b> · ${e.date}, ${e.time}</p>`).join('')
          : '<p>New events coming soon.</p>'}
        <h2>Achievements</h2><ul>${c.achievements.map((a) => `<li>🏆 ${a}</li>`).join('')}</ul>
        <h2>Why Join?</h2><ul>${c.why.map((a) => `<li>✨ ${a}</li>`).join('')}</ul>
      </div>
    </div>`;
  },

  events: () => `
    <section class="sec">
      <h2>What’s Happening on Campus?</h2>
      <p class="sub">Demo events. Dates are fictional.</p>
      <div id="filter-wrap"></div>
      <div class="grid" id="event-grid"></div>
    </section>`,

  gallery: () => `
    <section class="sec">
      <h2>Moments from Campus</h2>
      <p class="sub">Placeholder visuals.</p>
      <div id="filter-wrap"></div>
      <div class="masonry" id="masonry"></div>
    </section>`,

  space: () => {
    const pick = (ids) => clubs.filter((c) => ids.includes(c.id));
    const recommended = clubs.filter((c) => !isFav(c.id) && !isJoined(c.id)).slice(0, 3);
    const myStats = [
      [state.joined.length, 'Clubs Joined'],
      [state.favs.length, 'Saved Clubs'],
      [state.regs.length, 'Events Registered'],
    ];

    return `
    <section class="sec">
      <h2>My Space</h2>
      <p class="sub">Good ${greeting()}, Student 👋</p>
      <div class="stats mini">${myStats.map(statBox).join('')}</div>

      <h3>Saved Clubs</h3>
      ${state.favs.length
        ? `<div class="grid">${pick(state.favs).map(clubCard).join('')}</div>`
        : '<p>No saved clubs yet. <a href="#/clubs">Browse clubs</a></p>'}

      <h3>Joined Clubs</h3>
      ${state.joined.length
        ? `<ul class="chips">${pick(state.joined).map((c) => `<li>${c.emoji} ${c.name}</li>`).join('')}</ul>`
        : "<p>You haven't joined any clubs yet.</p>"}

      <h3>Registered Events</h3>
      ${state.regs.length
        ? events.filter((e) => isRegistered(e.id)).map((e) => `<p>${e.emoji} <b>${e.name}</b> · ${e.date}</p>`).join('')
        : '<p>No registrations yet.</p>'}

      <h3>Recent Activity</h3>
      ${state.act.length
        ? `<ul>${state.act.map((a) => `<li>${a}</li>`).join('')}</ul>`
        : '<p>Nothing yet.</p>'}

      <h3>Recommended Clubs</h3>
      <div class="grid">${recommended.map(clubCard).join('')}</div>
    </section>`;
  },

  about: () => `
    <section class="sec">
      <h2>About ClubVerse</h2>
      <div class="grid">
        ${ABOUT_CARDS.map(([title, text]) => `<div class="card why"><h3>${title}</h3><p>${text}</p></div>`).join('')}
      </div>
      <p class="sub center">ClubVerse is a training project and is not an official university website.</p>
    </section>`,
};

/* =============================================================
   7. PAGE SETUP (runs after a page is drawn)
   ============================================================= */
const pageSetup = {
  clubs() {
    let query = '';
    let category = 'All';

    const draw = () => {
      $('#filter-wrap').innerHTML = filterBar(['All', ...CLUB_CATEGORIES], category, 'cat');
      const search = query.trim().toLowerCase();
      const list = clubs.filter((c) => {
        const matchesCategory = category === 'All' || c.category === category;
        const matchesSearch = !search || `${c.name} ${c.category} ${c.description}`.toLowerCase().includes(search);
        return matchesCategory && matchesSearch;
      });

      $('#club-grid').innerHTML = list.length
        ? `<div class="grid">${list.map(clubCard).join('')}</div>`
        : '<div class="empty"><h3>No clubs found</h3><p>Try another search or category.</p></div>';
    };

    $('#q').addEventListener('input', (e) => { query = e.target.value; draw(); });
    $('#filter-wrap').addEventListener('click', (e) => {
      if (e.target.dataset.cat) { category = e.target.dataset.cat; draw(); }
    });
    draw();
  },

  events() {
    let type = 'All';

    const draw = () => {
      $('#filter-wrap').innerHTML = filterBar(['All', ...EVENT_TYPES], type, 'etype');
      $('#event-grid').innerHTML = events
        .filter((e) => type === 'All' || e.type === type)
        .map(eventCard)
        .join('');
    };

    $('#filter-wrap').addEventListener('click', (e) => {
      if (e.target.dataset.etype) { type = e.target.dataset.etype; draw(); }
    });
    draw();
  },

  gallery() {
    let filter = 'All';

    const draw = () => {
      $('#filter-wrap').innerHTML = filterBar(['All', ...GALLERY_CATS], filter, 'gcat');
      $('#masonry').innerHTML = gallery
        .map((g, i) => ({ ...g, i })) // keep the original index for the lightbox
        .filter((g) => filter === 'All' || g.cat === filter)
        .map(galleryTile)
        .join('');
    };

    $('#filter-wrap').addEventListener('click', (e) => {
      if (e.target.dataset.gcat) { filter = e.target.dataset.gcat; draw(); }
    });
    draw();
  },
};

/* =============================================================
   8. MODAL (popup, forms, lightbox)
   ============================================================= */
const closeModal = () => {
  $('#modal-root').innerHTML = '';
  document.body.style.overflow = '';
};

function openModal(html, extraClass = '') {
  const root = $('#modal-root');
  root.innerHTML = `
    <div class="overlay">
      <div class="modal ${extraClass}">
        <button class="x" aria-label="Close">✕</button>${html}
      </div>
    </div>`;
  document.body.style.overflow = 'hidden'; // stop the page scrolling behind the popup

  $('.overlay', root).addEventListener('click', (e) => {
    const clickedOutside = e.target.classList.contains('overlay');
    const clickedClose = e.target.classList.contains('x') || e.target.dataset.close;
    if (clickedOutside || clickedClose) closeModal();
  });
  return root;
}

const formField = ([key, label, type]) => `
  <label>${label}
    ${type === 'select'
      ? `<select name="${key}"><option value="">Select</option>${YEAR_OPTIONS.map((y) => `<option>${y} year</option>`).join('')}</select>`
      : `<input name="${key}" type="${type || 'text'}" />`}
    <em></em>
  </label>`;

/* Checks every field; shows an error message under each invalid one */
function validateForm(form, fields) {
  let valid = true;
  fields.forEach(([key, label]) => {
    const input = form.elements[key];
    const value = input.value.trim();
    let message = value ? '' : `${label} is required`;
    if (!message && key === 'email' && !/^\S+@\S+\.\S+$/.test(value)) message = 'Enter a valid email';
    input.parentElement.querySelector('em').textContent = message;
    if (message) valid = false;
  });
  return valid;
}

function formModal({ title, fields, label, success, onDone }) {
  const root = openModal(`
    <form novalidate>
      <h2>${title}</h2>
      ${fields.map(formField).join('')}
      <button class="btn" type="submit">${label}</button>
    </form>`);

  $('form', root).addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateForm(e.target, fields)) return;

    onDone();
    $('.modal', root).innerHTML = `
      <button class="x" aria-label="Close">✕</button>
      <div class="ok"><h2>${success}</h2><button class="btn" data-close="1">Done</button></div>`;
    router();
  });
}

/* Gallery lightbox: uses its own wider modal class so the image always fits */
function openLightbox(index) {
  const g = gallery[index];
  if (!g) return;
  openModal(
    `<div class="tile lightbox has-img" style="--c:${g.c}">${galleryPhoto(g)}<span>${g.e}</span><small>${g.cat}</small></div>`,
    'lightbox-modal'
  );
}

/* =============================================================
   9. EVENT HANDLERS
   ============================================================= */
const updateBadge = () => {
  const badge = $('#badge');
  badge.hidden = !state.favs.length;
  badge.textContent = state.favs.length;
};

function applyTheme() {
  document.documentElement.dataset.theme = state.theme;
  $('#theme').textContent = state.theme === 'light' ? '🌙' : '☀️';
}

/* --- Save / unsave a club (heart button) --- */
function handleFavToggle(id) {
  state.favs = isFav(id) ? state.favs.filter((x) => x !== id) : [...state.favs, id];
  persist();
  updateBadge();

  if (location.hash.startsWith('#/my-space')) return router();

  const on = isFav(id);
  document.querySelectorAll(`[data-fav="${id}"]`).forEach((btn) => {
    btn.classList.remove('on');
    void btn.offsetWidth; // restart the CSS animation
    btn.classList.toggle('on', on);
    btn.textContent = btn.dataset.label
      ? (on ? '♥ Saved' : '♡ Add to My Clubs')
      : (on ? '♥' : '♡');
  });
}

/* --- Join a club (opens form) --- */
function handleJoin(id) {
  const club = getClub(id);
  formModal({
    title: `Join ${club.name}`,
    label: 'Join Club',
    success: '🎉 Welcome to the club!',
    fields: [
      ['name', 'Full Name'],
      ['uid', 'University ID'],
      ['email', 'Email', 'email'],
      ['dept', 'Department'],
      ['year', 'Year', 'select'],
    ],
    onDone: () => {
      if (!isJoined(club.id)) state.joined.push(club.id);
      logActivity(`Joined the ${club.name} club`);
      persist();
    },
  });
}

/* --- Register for an event (opens form) --- */
function handleRegister(id) {
  const event = getEvent(id);
  if (isRegistered(event.id)) return;
  formModal({
    title: `Register: ${event.name}`,
    label: 'Confirm Registration',
    success: "🎉 You're registered!",
    fields: [
      ['name', 'Name'],
      ['uid', 'University ID'],
      ['email', 'Email', 'email'],
      ['dept', 'Department'],
    ],
    onDone: () => {
      if (!isRegistered(event.id)) state.regs.push(event.id);
      logActivity(`Registered for ${event.name}`);
      persist();
    },
  });
}

/* --- One click listener for every button in the app --- */
document.addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;

  const { fav, join, reg, tile } = btn.dataset;
  if (fav) handleFavToggle(fav);
  if (join) handleJoin(join);
  if (reg) handleRegister(reg);
  if (tile) openLightbox(Number(tile));
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && $('#modal-root').firstChild) closeModal();
});

$('#theme').addEventListener('click', () => {
  state.theme = state.theme === 'light' ? 'dark' : 'light';
  persist();
  applyTheme();
});

$('#burger').addEventListener('click', () => $('#links').classList.toggle('open'));

addEventListener('scroll', () => $('#nav').classList.toggle('scrolled', scrollY > 20));

/* =============================================================
   10. ROUTER (hash-based navigation)
   ============================================================= */
function router() {
  const [, path = '', id] = location.hash.slice(1).split('/');

  const routes = {
    '': 'home',
    clubs: id ? 'detail' : 'clubs',
    events: 'events',
    gallery: 'gallery',
    'my-space': 'space',
    about: 'about',
  };
  const pageName = routes[path] || 'home';

  app.innerHTML = pages[pageName](id);
  (pageSetup[pageName] || (() => {}))();

  document.querySelectorAll('.links a').forEach((a) => {
    a.classList.toggle('active', a.dataset.r === path);
  });
  $('#links').classList.remove('open');
}

addEventListener('hashchange', () => {
  closeModal();
  router();
  window.scrollTo(0, 0);
});

/* =============================================================
   11. INIT
   ============================================================= */
applyTheme();
updateBadge();
router();