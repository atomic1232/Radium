/**
 * RADIUM - Main Script
 * Patched to fix Dock Initialization and Asset Loading
 */

// =====================
// 1. PARTICLES.JS INIT
// =====================
particlesJS("particles-js", {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: "#0bfc03" },
    shape: { type: "circle" },
    opacity: { value: 0.5, random: true },
    size: { value: 3, random: true },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#0bfc03",
      opacity: 0.4,
      width: 1
    },
    move: { enable: true, speed: 2 }
  },
  interactivity: {
    events: {
      onhover: { enable: true, mode: "bubble" },
      onclick: { enable: true, mode: "repulse" }
    }
  },
  retina_detect: true
});

// =====================
// 2. GLOBAL SETTINGS
// =====================
let panicKey = "]";
let panicUrl = "https://www.google.com";
let cloakUrl = "https://www.google.com";
let currentGamePage = 1;
const GAMES_PER_PAGE = 1000;

// =====================
// 3. CORE FUNCTIONS
// =====================

function openGame(url) {
  const container = document.getElementById("game-container");
  const iframe = document.getElementById("game-iframe");
  if (!container || !iframe) return;
  iframe.src = url;
  container.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeGame() {
  const container = document.getElementById("game-container");
  const iframe = document.getElementById("game-iframe");
  if (!container || !iframe) return;
  iframe.src = "";
  container.classList.add("hidden");
  document.body.style.overflow = "auto";
}

function updateDate() {
  const el = document.getElementById("date-display");
  if (el) el.textContent = new Date().toDateString();
}

async function loadClock() {
  const clockTarget = document.getElementById("clock-widget");
  if (!clockTarget) return;
  try {
    // Attempt Lumin widget, fallback to local clock
    const res = await Lumin.runWidget({ type: "clock", time_format: "12h" });
    clockTarget.innerHTML = "";
    clockTarget.appendChild(res.element || res);
  } catch {
    clockTarget.textContent = new Date().toLocaleTimeString();
  }
}

// =====================
// 4. PAGE TEMPLATES
// =====================
const pages = {
  home: `
  <section class="hero">
    <div class="top-clock">
      <div class="clock-left" id="clock-widget"></div>
      <div class="clock-divider"></div>
      <div class="clock-right" id="date-display"></div>
    </div>
    <h2 class="title">ＲＡＤＩＵＭ</h2>
    <p class="custom-message">Report bugs!</p>
  </section>`,
  games: `
  <section class="hero">
    <h2>Games</h2>
    <div class="search-container">
      <input id="game-search" type="text" placeholder="Search games..." />
    </div>
    <div id="games-grid"></div>
  </section>`,
  settings: `
  <section class="hero">
    <h2>Settings</h2>
    <div class="panic-box">
      <div class="panic-row">
        <span>Panic Key: <strong id="panic-key-display">${panicKey}</strong></span>
        <button id="set-panic-key" class="panic-btn">Change</button>
      </div>
      <div class="panic-row">
        <span>Redirect URL:</span>
        <input id="panic-url-input" type="text" value="${panicUrl}">
      </div>
    </div>
  </section>`,
  credits: `
  <section class="hero">
    <h2>Credits</h2>
    <div class="credits-list">
      <p>Lumin: <a href="https://luminsdk.com/" target="_blank">SDK Support</a></p>
      <p>Assets: GitHub Hosted</p>
    </div>
  </section>`
};

// =====================
// 5. THE PATCH: DOCK & PAGE SYSTEM
// =====================

/**
 * Builds the navigation links dynamically.
 * Synchronous to ensure links exist before loadPage runs.
 */
function buildDock() {
  const dock = document.querySelector(".nav-expanded");
  if (!dock) return;

  dock.innerHTML = ""; // Clear existing

  const dockPages = [
    { id: "home", label: "Home", icon: "https://cdn.jsdelivr.net/gh/atomic1232/Radium@latest/assets/HomeIcon.png" },
    { id: "games", label: "Games", icon: "https://cdn.jsdelivr.net/gh/atomic1232/Radium@latest/assets/GamesIcon.png" },
    { id: "settings", label: "Settings", icon: "https://cdn.jsdelivr.net/gh/atomic1232/Radium@latest/assets/SettingIcon.png" },
    { id: "credits", label: "Credits", icon: "https://cdn.jsdelivr.net/gh/atomic1232/Radium@latest/assets/CreditsIcon.png" }
  ];

  dockPages.forEach(page => {
    const a = document.createElement("a");
    a.dataset.page = page.id;
    a.href = "javascript:void(0)";
    
    // Inject icon and label
    a.innerHTML = `
      <img src="${page.icon}" alt="${page.label}" onerror="this.style.display='none'">
      <span>${page.label}</span>
    `;

    a.onclick = (e) => {
      e.preventDefault();
      loadPage(page.id);
      history.pushState({}, "", `#${page.id}`);
    };

    dock.appendChild(a);
  });
}

function loadPage(pageId) {
  const content = document.getElementById("content");
  if (!content) return;

  // 1. Render Template
  content.innerHTML = pages[pageId] || pages.home;

  // 2. Update Active Class in Dock (Crucial for visibility)
  const links = document.querySelectorAll(".nav-expanded a");
  links.forEach(link => {
    if (link.dataset.page === pageId) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // 3. Page Specific Logic
  if (pageId === "home") {
    updateDate();
    loadClock();
  }
  // Add other page-specific init (like loadGames) here as needed
}

// =====================
// 6. INITIALIZATION
// =====================
document.addEventListener("DOMContentLoaded", () => {
  // 1. Build the dock elements first
  buildDock();

  // 2. Load the initial page based on URL hash
  const initial = location.hash.replace("#", "") || "home";
  loadPage(initial);

  // 3. Set up global listeners
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeGame();
    if (e.key === panicKey) window.location.href = panicUrl;
  });

  // 4. Start Tick Timers
  setInterval(updateDate, 1000);
  setInterval(loadClock, 1000);
});
