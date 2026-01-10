// -------------------
// Persistent dark mode
// -------------------
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark");
}

// Dark mode toggle function
function toggleDarkMode() {
  document.body.classList.toggle("dark");
  localStorage.setItem("darkMode", document.body.classList.contains("dark"));
}

// -------------------
// Page content
// -------------------
const pages = {
  home: `
    <section class="hero">
      <h2>Welcome 👋</h2>
      <p>This is the Home page of your website. Explore games, unblockers, and customize your settings!</p>
    </section>
  `,
  games: `
    <section class="hero">
      <h2>Games 🎮</h2>
      <p>Play fun and safe games right here! Click any game link below to start:</p>
      <ul>
        <li><a href="https://example.com/game1" target="_blank">Game 1</a></li>
        <li><a href="https://example.com/game2" target="_blank">Game 2</a></li>
        <li><a href="https://example.com/game3" target="_blank">Game 3</a></li>
      </ul>
    </section>
  `,
  unblockers: `
    <section class="hero">
      <h2>Unblockers 🔓</h2>
      <p>Access blocked tools or websites safely:</p>
      <ul>
        <li><a href="https://example.com/unblocker1" target="_blank">Unblocker 1</a></li>
        <li><a href="https://example.com/unblocker2" target="_blank">Unblocker 2</a></li>
        <li><a href="https://example.com/unblocker3" target="_blank">Unblocker 3</a></li>
      </ul>
    </section>
  `,
  settings: `
    <section class="hero">
      <h2>Settings ⚙️</h2>
      <p>Customize your experience:</p>
      <ul>
        <li><strong>Dark Mode:</strong> Default is enabled, toggle below:</li>
        <li><strong>Profile:</strong> Add your username, avatar, or preferences here.</li>
        <li><strong>Notifications:</strong> Enable or disable site alerts and updates.</li>
        <li><strong>Privacy:</strong> Control which data the website remembers.</li>
      </ul>
      <button id="themeToggle">Toggle Dark Mode</button>
    </section>
  `
};

// Load initial page
const content = document.getElementById("content");
function loadPage(page) {
  content.innerHTML = pages[page];

  // Add dark mode toggle event if present
  const toggle = document.getElementById("themeToggle");
  if (toggle) toggle.addEventListener("click", toggleDarkMode);

  // Update active link
  document.querySelectorAll("nav a").forEach(a => {
    a.classList.remove("active");
    if (a.dataset.page === page) a.classList.add("active");
  });
}

// Event listeners for nav links
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const page = link.dataset.page;
    loadPage(page);
    history.pushState({ page }, "", `#${page}`);
  });
});

// Handle browser back/forward buttons
window.addEventListener("popstate", (e) => {
  const page = (e.state && e.state.page) || "home";
  loadPage(page);
});

// Load page based on URL hash or default to home
const initialPage = location.hash.replace("#","") || "home";
loadPage(initialPage);
history.replaceState({ page: initialPage }, "", `#${initialPage}`);
