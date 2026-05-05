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
    const res = await Lumin.runWidget({ type: "clock", time_format: "12h" });
    clockTarget.innerHTML = "";
    clockTarget.appendChild(res.element || res);
  } catch {
    clockTarget.textContent = new Date().toLocaleTimeString();
  }
}

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

async function loadGames() {
  const container = document.getElementById("games-grid");
  if (!container) return;

  container.innerHTML = `<div class="loader"><div class="jimu-primary-loading"></div></div>`;

  try {
    const res = await Lumin.getGames({ page: 1, limit: GAMES_PER_PAGE });
    let games = res.games || [];

    games.sort((a, b) =>
      a.name.trim().toLowerCase().localeCompare(b.name.trim().toLowerCase())
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
// 5. DOCK & PAGE SYSTEM
// =====================

function buildDock() {
  const dock = document.querySelector(".nav-expanded");
  if (!dock) return;

  dock.innerHTML = "";

  const dockPages = [
    { id: "home",     label: "Home",     icon: "https://cdn.jsdelivr.net/gh/atomic1232/Radium@latest/assets/HomeIcon.png" },
    { id: "games",    label: "Games",    icon: "https://cdn.jsdelivr.net/gh/atomic1232/Radium@latest/assets/GamesIcon.png" },
    { id: "settings", label: "Settings", icon: "https://cdn.jsdelivr.net/gh/atomic1232/Radium@latest/assets/SettingIcon.png" },
    { id: "credits",  label: "Credits",  icon: "https://cdn.jsdelivr.net/gh/atomic1232/Radium@latest/assets/CreditsIcon.png" }
  ];

  dockPages.forEach(page => {
    const a = document.createElement("a");
    a.dataset.page = page.id;
    a.href = "javascript:void(0)";
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

  // Cloak — action, not a page
  const cloakA = document.createElement("a");
  cloakA.href = "javascript:void(0)";
  cloakA.innerHTML = `
    <img src="https://cdn.jsdelivr.net/gh/atomic1232/Radium@latest/assets/CloakIcon.png" alt="Cloak" onerror="this.style.display='none'">
    <span>Cloak</span>
  `;
  cloakA.onclick = (e) => {
    e.preventDefault();
    openCloaked();
  };
  dock.appendChild(cloakA);
}

function loadPage(pageId) {
  const content = document.getElementById("content");
  if (!content) return;

  content.innerHTML = pages[pageId] || pages.home;

  const links = document.querySelectorAll(".nav-expanded a");
  links.forEach(link => {
    if (link.dataset.page === pageId) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  if (pageId === "home") {
    updateDate();
    loadClock();
  }

  if (pageId === "games") {
    loadGames();
  }

  if (pageId === "settings") {
    const keyDisplay = document.getElementById("panic-key-display");
    const keyBtn = document.getElementById("set-panic-key");
    const urlInput = document.getElementById("panic-url-input");
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
  }
}

// =====================
// 6. INITIALIZATION
// =====================
document.addEventListener("DOMContentLoaded", async () => {
  try {
    if (typeof Lumin !== "undefined") await Lumin.init({});
  } catch (e) {
    console.warn("Lumin init failed:", e);
  }

  buildDock();

  const initial = location.hash.replace("#", "") || "home";
  loadPage(initial);

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeGame();
    if (e.key === panicKey) window.location.href = panicUrl;
  });

  setInterval(updateDate, 1000);
  setInterval(loadClock, 1000);
});
