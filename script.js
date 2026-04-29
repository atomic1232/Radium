document.write(``)
// =====================
// BOOT CHECK
// =====================
document.addEventListener("DOMContentLoaded", async () => {
  initApp();
});

// =====================
// GLOBAL STATE
// =====================
let panicKey = "]";
let panicUrl = "https://www.google.com";
let cloakUrl = "https://www.google.com";

let currentPage = "home";
let currentGamePage = 1;
const GAMES_PER_PAGE = 50;

let clockElement = null;

// =====================
// INIT APP
// =====================
async function initApp() {
  // Lumin init
  try {
    if (typeof Lumin !== "undefined") {
      await Lumin.init({});
    }
  } catch (e) {
    console.warn("Lumin init failed", e);
  }

  setupNav();
  setupEvents();
  loadPage(location.hash.replace("#", "") || "home");
  initParticles();
}

// =====================
// PARTICLES
// =====================
function initParticles() {
  if (typeof particlesJS === "undefined") return;

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
}

// =====================
// NAV
// =====================
function setupNav() {
  document.querySelectorAll("[data-page]").forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      loadPage(btn.dataset.page);
      history.pushState({}, "", `#${btn.dataset.page}`);
    });
  });

  document.getElementById("cloak-btn")?.addEventListener("click", e => {
    e.preventDefault();
    openCloaked();
  });
}

// =====================
// EVENTS
// =====================
function setupEvents() {
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeGame();
    if (e.key === panicKey) window.location.href = panicUrl;
  });

  document.getElementById("close-game")?.addEventListener("click", closeGame);
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

      <h2 class="title">ᏒᐱDꞮUᎷ</h2>
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
          <input id="panic-url-input" value="${panicUrl}">
        </div>

        <div class="panic-row">
          <span>Cloak Redirect:</span>
          <input id="cloak-url-input" value="${cloakUrl}">
        </div>
      </div>
    </section>
  `
};

// =====================
// PAGE LOADER
// =====================
function loadPage(page) {
  currentPage = page;

  const content = document.getElementById("content");
  if (!content) return;

  content.innerHTML = pages[page] || pages.home;

  updateNavActive();

  if (page === "home") initHome();
  if (page === "games") {
    loadGames(1);
    initGameSearch();
  }
  if (page === "settings") initSettings();
}

// =====================
// NAV ACTIVE STATE
// =====================
function updateNavActive() {
  document.querySelectorAll("[data-page]").forEach(el => {
    el.classList.toggle("active", el.dataset.page === currentPage);
  });
}

// =====================
// HOME
// =====================
function initHome() {
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

  setInterval(updateDate, 60000);
  setInterval(loadClock, 1000);
}

function updateDate() {
  const el = document.getElementById("date-display");
  if (!el) return;
  el.textContent = new Date().toDateString();
}

// =====================
// CLOCK
// =====================
async function loadClock() {
  const el = document.getElementById("clock-widget");
  if (!el) return;

  try {
    const res = await Lumin.runWidget({
      type: "clock",
      location: "Redmond, Washington, USA",
      tz_name: "America/Los_Angeles",
      time_format: "12h"
    });

    el.innerHTML = "";
    el.appendChild(res.element || res);
    clockElement = el;
  } catch {
    el.textContent = new Date().toLocaleTimeString();
  }
}

// =====================
// GAME LOADER
// =====================
async function loadGames(page = 1) {
  const container = document.getElementById("games-grid");
  if (!container) return;

  currentGamePage = page;

  container.innerHTML = `<div class="loader">Loading...</div>`;

  try {
    let games = [];
    let apiPage = 1;

    while (true) {
      const res = await Lumin.getGames({ page: apiPage, limit: 100 });
      if (!res.games?.length) break;

      games.push(...res.games);

      if (res.games.length < 100) break;
      apiPage++;
    }

    games = games.filter((v, i, a) => a.findIndex(x => x.id === v.id) === i);

    const sorted = games.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    const slice = sorted.slice(
      (page - 1) * GAMES_PER_PAGE,
      page * GAMES_PER_PAGE
    );

    const enriched = await Promise.all(
      slice.map(async g => {
        const [{ url }, img] = await Promise.all([
          Lumin.getGameUrl(g.id),
          Lumin.getImageUrl(g.image_token).catch(() => null)
        ]);

        return { ...g, url, img };
      })
    );

    container.innerHTML = "";

    enriched.forEach(g => {
      const div = document.createElement("div");
      div.className = "game-card-container";
      div.innerHTML = `
        <div class="container">
          <div class="glass" data-text="${g.name}">
            <img src="${g.img}" />
          </div>
        </div>
      `;

      div.onclick = () => openGame(g.url);
      container.appendChild(div);
    });

  } catch (e) {
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

    document.querySelectorAll(".game-card-container").forEach(card => {
      const name = card.querySelector("[data-text]").getAttribute("data-text").toLowerCase();
      card.style.display = name.includes(term) ? "block" : "none";
    });
  });
}

// =====================
// PANIC SETTINGS
// =====================
function initSettings() {
  const keyBtn = document.getElementById("set-panic-key");

  keyBtn?.addEventListener("click", () => {
    const display = document.getElementById("panic-key-display");
    display.textContent = "Press key...";

    const listener = e => {
      panicKey = e.key;
      display.textContent = panicKey;
      document.removeEventListener("keydown", listener);
    };

    document.addEventListener("keydown", listener);
  });

  document.getElementById("panic-url-input")?.addEventListener("input", e => {
    panicUrl = e.target.value;
  });

  document.getElementById("cloak-url-input")?.addEventListener("input", e => {
    cloakUrl = e.target.value;
  });
}

// =====================
// CLOAK
// =====================
function openCloaked() {
  const win = window.open("about:blank", "_blank");
  if (!win) return;

  const iframe = win.document.createElement("iframe");
  iframe.style = "width:100%;height:100%;border:none;";
  iframe.src = location.href;

  win.document.body.style.margin = "0";
  win.document.body.appendChild(iframe);

  location.replace(cloakUrl);
}

// =====================
function openGame(url) {
  const c = document.getElementById("game-container");
  const f = document.getElementById("game-iframe");

  f.src = url;
  c.classList.remove("hidden");
}

function closeGame() {
  const c = document.getElementById("game-container");
  const f = document.getElementById("game-iframe");

  f.src = "";
  c.classList.add("hidden");
}
