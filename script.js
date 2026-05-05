// =====================
// PARTICLES.JS
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
// PANIC SETTINGS
// =====================
let panicKey = "]";
let panicUrl = "https://www.google.com";
let cloakUrl = "https://www.google.com";

// =====================
// STATE
// =====================
let currentPage = "home";
let clockElement = null;
let clockInterval = null;

// =====================
// GAME OVERLAY
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

// =====================
// GAME STATE
// =====================
let currentGamePage = 1;
const GAMES_PER_PAGE = 1000;

function normalizeName(name = "") {
  return name.trim().toLowerCase().replace(/[^a-z0-9 ]/gi, "");
}

// =====================
// CLOAK
// =====================
function openCloaked() {
  const win = window.open("about:blank", "_blank");
  if (!win) return;

  win.document.body.style.margin = "0";
  win.document.body.style.height = "100vh";

  const iframe = win.document.createElement("iframe");
  iframe.style.border = "none";
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.src = window.location.href;

  win.document.body.appendChild(iframe);

  window.location.replace(cloakUrl || "https://www.google.com");
}

// =====================
// GAME LOADER
// =====================
async function loadGames(page = 1) {
  const container = document.getElementById("games-grid");
  if (!container) return;

  currentGamePage = page;

  container.innerHTML = `
    <div class="loader">
      <div class="jimu-primary-loading"></div>
    </div>
  `;

  try {
    const res = await Lumin.getGames({
      page,
      limit: GAMES_PER_PAGE
    });

    let games = res.games || [];

    games.sort((a, b) =>
      normalizeName(a.name).localeCompare(normalizeName(b.name))
    );

    container.innerHTML = "";

    games.forEach(game => {
      const card = document.createElement("div");
      card.className = "game-card-container";

      card.innerHTML = `
        <div class="container">
          <div class="glass" data-text="${game.name}">
            <img data-token="${game.image_token}" alt="${game.name}">
          </div>
        </div>
      `;

      const img = card.querySelector("img");

      const observer = new IntersectionObserver(entries => {
        entries.forEach(async entry => {
          if (entry.isIntersecting) {
            const token = img.getAttribute("data-token");
            const url = await Lumin.getImageUrl(token).catch(() => "");
            img.src = url;
            observer.disconnect();
          }
        });
      });

      observer.observe(img);

      card.onclick = async () => {
        const { url } = await Lumin.getGameUrl(game.id);
        openGame(url);
      };

      container.appendChild(card);
    });

  } catch (err) {
    console.error(err);
    container.innerHTML = "Failed to load games.";
  }
}

// =====================
// SEARCH
// =====================
function initGameSearch() {
  const input = document.getElementById("game-search");
  if (!input) return;

  input.addEventListener("input", e => {
    const term = e.target.value.toLowerCase();
    const cards = document.querySelectorAll(".game-card-container");

    cards.forEach(card => {
      const name = card.querySelector(".glass")?.getAttribute("data-text") || "";
      const match = name.toLowerCase().includes(term);

      card.style.display = match ? "block" : "none";
    });
  });
}

// =====================
// PANIC SETTINGS
// =====================
function initPanicSettings() {
  const keyDisplay = document.getElementById("panic-key-display");
  const keyBtn = document.getElementById("set-panic-key");
  const urlInput = document.getElementById("panic-url-input");
  const cloakInput = document.getElementById("cloak-url-input");

  if (!keyDisplay || !keyBtn || !urlInput) return;

  keyBtn.onclick = () => {
    keyDisplay.textContent = "Press key...";

    const listener = e => {
      panicKey = e.key;
      keyDisplay.textContent = panicKey;
      document.removeEventListener("keydown", listener);
    };

    document.addEventListener("keydown", listener);
  };

  urlInput.oninput = () => (panicUrl = urlInput.value);
  if (cloakInput) cloakInput.oninput = () => (cloakUrl = cloakInput.value);
}

// =====================
// PAGES
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
    <p class="custom-message"></p>
  </section>
`,

  games: `
  <section class="hero">
    <h2>Games</h2>

    <div class="search-container">
      <input id="game-search" type="text" placeholder="Search games..." />
    </div>

    <div id="games-grid"></div>
  </section>
`,

  settings: `
  <section class="hero">
    <h2>Settings</h2>

    <div class="panic-box">
      <div class="panic-row">
        <span>Panic Key: <strong id="panic-key-display">${panicKey}</strong></span>
        <button id="set-panic-key" class="panic-btn">Change</button>
      </div>

      <div class="panic-row">
        <span>Redirect:</span>
        <input id="panic-url-input" type="text" value="${panicUrl}">
      </div>

      <div class="panic-row">
        <span>Cloak Redirect:</span>
        <input id="cloak-url-input" type="text" value="${cloakUrl}">
      </div>
    </div>
  </section>
`,

  credits: `
  <section class="hero">
    <h2>Credits</h2>

    <div class="credits-list">
      <p>Lumin: <a href="https://luminsdk.com/" target="_blank">https://luminsdk.com/</a></p>
      <p>Selenite: <a href="https://selenite.cc" target="_blank">https://selenite.cc</a></p>
      <p>Vapor: <a href="https://pipseducationfund.org" target="_blank">https://pipseducationfund.org</a></p>
    </div>
  </section>
`,
  cloak: `
  <section class="hero">
    <h2>Cloak Mode</h2>

    <div class="panic-box">
      <p>Open this site in a hidden tab (about:blank iframe cloak).</p>

      <button id="cloak-open-btn" class="panic-btn">
        Open Cloaked Tab
      </button>

      <div class="panic-row" style="margin-top:10px;">
        <span>Cloak Redirect:</span>
        <input id="cloak-url-input" type="text" value="${cloakUrl}">
      </div>
    </div>
  </section>
`
};

// =====================
// CLOCK (FIXED)
// =====================
function updateDate() {
  const el = document.getElementById("date-display");
  if (!el) return;
  el.textContent = new Date().toDateString();
}

async function loadClock() {
  const clockTarget = document.getElementById("clock-widget");
  if (!clockTarget) return;

  try {
    const res = await Lumin.runWidget({
      type: "clock",
      location: "Redmond, Washington, USA",
      tz_name: "America/Los_Angeles",
      time_format: "12h"
    });

    clockTarget.innerHTML = "";
    clockTarget.appendChild(res.element || res);
    clockElement = clockTarget;

  } catch {
    clockTarget.textContent = new Date().toLocaleTimeString();
    clockElement = clockTarget;
  }
}

// =====================
// PAGE SYSTEM (FIXED)
// =====================
function loadPage(page) {
  const content = document.getElementById("content");
  if (!content) return;
if (page === "cloak") {
  const btn = document.getElementById("cloak-open-btn");
  if (btn) {
    btn.onclick = () => {
      openCloaked();
    };
  }

  const cloakInput = document.getElementById("cloak-url-input");
  if (cloakInput) {
    cloakInput.value = cloakUrl;
    cloakInput.oninput = () => {
      cloakUrl = cloakInput.value;
    };
  }
}
  currentPage = page;
  content.innerHTML = pages[page] || pages.home;

  document.querySelectorAll("[data-page]").forEach(link => {
    link.classList.toggle("active", link.dataset.page === page);
  });

  if (page === "games") {
    loadGames(1);
    initGameSearch();
  }

  if (page === "settings") {
    initPanicSettings();
  }

  if (page === "home") {
    const msg = document.querySelector(".custom-message");
    if (msg) {
      const messages = [
        "By UGA",
        "Legends tell of a bee hidden in Radium",
        "Inspired by selenite",
        "Go set your panic key today!",
        "Report bugs!"
      ];
      msg.textContent = messages[Math.floor(Math.random() * messages.length)];
    }

    updateDate();
    loadClock();
  }
}

// =====================
// DOCK (FIXED CLICK ISSUE)
// =====================
async function buildDock() {
  const dock = document.querySelector(".nav-expanded");
  if (!dock) return;

  dock.innerHTML = "";

  const dockPages = [
    { id: "home", label: "Home", icon: "https://cdn.jsdelivr.net/gh/atomic1232/Radium@latest/assets/HomeIcon.png" },
    { id: "games", label: "Games", icon: "https://cdn.jsdelivr.net/gh/atomic1232/Radium@latest/assets/GamesIcon.png" },
    { id: "settings", label: "Settings", icon: "https://cdn.jsdelivr.net/gh/atomic1232/Radium@latest/assets/SettingIcon.png" },
    { id: "credits", label: "Credits", icon: "https://cdn.jsdelivr.net/gh/atomic1232/Radium@latest/assets/CreditsIcon.png" }
  ];

  dockPages.forEach(page => {
    const a = document.createElement("a");
    a.dataset.page = page.id;

    a.innerHTML = `
      <img src="${page.icon}" alt="${page.label}">
      <span>${page.label}</span>
    `;

    if (page.id === "home") a.classList.add("active");

    a.onclick = e => {
      e.preventDefault();
      loadPage(page.id);
      history.pushState({}, "", `#${page.id}`);
    };

    dock.appendChild(a);
  });
}

// =====================
// INIT (FIXED ORDER)
// =====================
document.addEventListener("DOMContentLoaded", async () => {
  await buildDock();

  const initial = location.hash.replace("#", "") || "home";

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeGame();
    if (e.key === panicKey) window.location.href = panicUrl;
  });

  loadPage(initial);

  updateDate();
  loadClock();

  setInterval(updateDate, 1000);
  setInterval(loadClock, 1000);
});
