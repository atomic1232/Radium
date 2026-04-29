document.write(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Radium</title>
  <link rel="stylesheet" href="style.css" />
</head>

<script src="https://cdn.jsdelivr.net/gh/luminsdk/script@latest/lumin.min.js"></script>

<body>

  <!-- Particles -->
  <div id="particles-js"></div>

  <div class="nav-dock" id="nav-dock">
    <div class="nav-expanded">
      <a href="#" data-page="home">
        <img src="assets/HomeIcon.png" />
        <span>Home</span>
      </a>
      <a href="#" data-page="games">
        <img src="assets/GamesIcon.png" />
        <span>Games</span>
      </a>
      <a href="#" data-page="settings">
        <img src="assets/SettingIcon.png" />
        <span>Settings</span>
      </a>
      <a href="#" data-page="credits">
        <img src="assets/CreditsIcon.png" />
        <span>Credits</span>
      </a>
      <a href="#" id="cloak-btn">
        <img src="assets/CloakIcon.png" alt="Cloak">
        <span>Cloak</span>
      </a>
    </div>
  </div>  
  <main id="content">

    <div id="page-games" class="hidden">
      <div id="games-grid"></div>
    </div>

  </main>

  <!-- Game Overlay -->
  <div id="game-container" class="game-container hidden">
    <button id="close-game" class="close-game-btn">✕</button>
    <iframe id="game-iframe" class="game-iframe"></iframe>
  </div>

  <!-- Scripts -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/particles.js/2.0.0/particles.min.js"></script>
  <script src="script.js"></script>

`)






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

// =====================
// GAME OVERLAY
// =====================
function openGame(url) {
  const container = document.getElementById("game-container");
  const iframe = document.getElementById("game-iframe");

  iframe.src = url;
  container.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeGame() {
  const container = document.getElementById("game-container");
  const iframe = document.getElementById("game-iframe");

  iframe.src = "";
  container.classList.add("hidden");
  document.body.style.overflow = "auto";
}

// =====================
// PAGINATION STATE
// =====================
let currentGamePage = 1;
const GAMES_PER_PAGE = 50;

function normalizeName(name = "") {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9 ]/gi, "");
}

// =====================
// CLOAK FUNCTION
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
    <div id="games-loader" class="loader">
      <div class="jimu-primary-loading"></div>
    </div>
  `;

  try {
    let allGames = [];
    let apiPage = 1;

    while (true) {
      const res = await Lumin.getGames({
        page: apiPage,
        limit: 100
      });

      if (!res.games || res.games.length === 0) break;

      for (const g of res.games) {
        if (!allGames.some(x => x.id === g.id)) {
          allGames.push(g);
        }
      }

      if (res.games.length < 100) break;

      apiPage++;
    }

    const sorted = allGames.sort((a, b) =>
      normalizeName(a.name).localeCompare(normalizeName(b.name), "en", {
        numeric: true
      })
    );

    const start = (page - 1) * GAMES_PER_PAGE;
    const end = start + GAMES_PER_PAGE;
    const pageGames = sorted.slice(start, end);

    const enrichedGames = await Promise.all(
      pageGames.map(async (game) => {
        const [{ url }, img] = await Promise.all([
          Lumin.getGameUrl(game.id),
          Lumin.getImageUrl(game.image_token).catch(() => null)
        ]);
        return { game, url, img };
      })
    );

    container.innerHTML = "";

    enrichedGames.forEach(({ game, url, img }) => {
      const card = document.createElement("div");
      card.className = "game-card-container";

      card.innerHTML = `
        <div class="container">
          <div class="glass" data-text="${game.name}">
            <img src="${img}" alt="${game.name}" />
          </div>
        </div>
      `;

      card.addEventListener("click", () => openGame(url));
      container.appendChild(card);
    });

    renderPagination(sorted.length);

    const pagination = document.getElementById("game-pagination");
    if (pagination) pagination.style.display = "flex";

  } catch (err) {
    console.error("Lumin failed:", err);
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
    const cards = document.querySelectorAll("[data-text]");

    cards.forEach(card => {
      const name = card.getAttribute("data-text").toLowerCase();
      const wrapper = card.closest(".game-card-container");

      if (wrapper) {
        wrapper.style.display = name.includes(term) ? "block" : "none";
      }
    });

    const pagination = document.getElementById("game-pagination");
    if (pagination) pagination.style.display = "none";
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

  urlInput.oninput = () => {
    panicUrl = urlInput.value;
  };

  if (cloakInput) {
    cloakInput.oninput = () => {
      cloakUrl = cloakInput.value;
    };
  }
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

      <div id="games-grid">
        <div id="games-loader" class="loader">
          <div class="jimu-primary-loading"></div>
        </div>
      </div>
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
  `
};

// =====================
// PAGINATION
// =====================
function renderPagination(totalGames) {
  const container = document.getElementById("games-grid");
  if (!container) return;

  let pagination = document.getElementById("game-pagination");

  if (!pagination) {
    pagination = document.createElement("div");
    pagination.id = "game-pagination";

    pagination.style.display = "flex";
    pagination.style.justifyContent = "center";
    pagination.style.gap = "8px";
    pagination.style.marginTop = "20px";

    container.parentElement.appendChild(pagination);
  }

  pagination.innerHTML = "";

  const totalPages = Math.ceil(totalGames / GAMES_PER_PAGE);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;

    btn.style.padding = "6px 10px";
    btn.style.border = "1px solid #0bfc03";
    btn.style.background = i === currentGamePage ? "#0bfc03" : "transparent";
    btn.style.color = i === currentGamePage ? "black" : "#0bfc03";
    btn.style.cursor = "pointer";
    btn.style.borderRadius = "6px";

    btn.onclick = () => loadGames(i);

    pagination.appendChild(btn);
  }
}

// =====================
// INIT
// =====================
document.addEventListener("DOMContentLoaded", async () => {
  const cloakBtn = document.getElementById("cloak-btn");
  if (cloakBtn) {
    cloakBtn.addEventListener("click", e => {
      e.preventDefault();
      openCloaked();
    });
  }

  try {
    if (typeof Lumin !== "undefined") {
      await Lumin.init({});
    }
  } catch (e) {
    console.warn(e);
  }

  document.getElementById("close-game")?.addEventListener("click", closeGame);

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeGame();
    if (e.key === panicKey) window.location.href = panicUrl;
  });

  const content = document.getElementById("content");

  function loadPage(page) {
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
        msg.textContent =
          messages[Math.floor(Math.random() * messages.length)];
      }
      clockElement = null;
      loadClock();
      
      setTimeout(() => {
        updateDate();
        loadClock();
      }, 50);
    }
    if (page === "home") {
      setTimeout(() => {
        updateDate();
        loadClock();
      }, 50);
    }
  }

  document.querySelectorAll("[data-page]").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      loadPage(link.dataset.page);
      history.pushState({}, "", `#${link.dataset.page}`);
    });
  });

  loadPage(location.hash.replace("#", "") || "home");

  // CLOCK FIX (REAL VERSION)
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
  
      // ✅ IMPORTANT: cache the actual text node we will update
      clockElement = clockTarget.querySelector("*") || clockTarget;
  
    } catch (e) {
      clockTarget.textContent = new Date().toLocaleTimeString();
      clockElement = clockTarget;
    }
  }
  function updateClockText() {
    if (!clockElement) return;
  
    const now = new Date();
  
    // If widget replaced DOM with element
    if (clockElement.nodeType === 1) {
      clockElement.textContent = now.toLocaleTimeString();
    }
  }

  updateDate();
  loadClock();
  setInterval(() => {
    updateDate();
  }, 1000);
  
  setInterval(() => {
    loadClock();
  }, 1000);
});
